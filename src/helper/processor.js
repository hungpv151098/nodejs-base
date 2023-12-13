const { sequelize } = require('../models');
const { isProduction } = require('./utils');
const { sendJsonResponse } = require('./response');
const { responseCode } = require('../constants/app');
const { logInfo } = require('./log');

const process = async (action, req, res, next = null, needSqlTransaction = false) => {
  try {
    const data = await (needSqlTransaction
      ? sequelize.transaction(async t => await Promise.resolve(action(req, res, t)))
      : Promise.resolve(action(req, res)));

    if (next) {
      next(data);
    } else {
      sendJsonResponse(res, null, data || null);
    }
  } catch (e) {
    console.log(e);
    const { code } = e;
    logInfo(e.code + ' ' + e.message);
    const message =
      (!code || code === responseCode.UNKNOWN_ERROR) && isProduction() ? req.t('error.unknownError') : req.t(e.message);
    sendJsonResponse(res, message, e.data || null, code);
  }
};

const processAction =
  (action, needSqlTransaction = false) =>
  async (req, res) => {
    return await process(action, req, res, null, needSqlTransaction);
  };

const processMiddleware = action => async (req, res, next) => {
  return await process(action, req, res, next);
};

module.exports = {
  processAction,
  processMiddleware,
};
