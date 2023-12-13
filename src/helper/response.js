const { responseStatus, responseCode } = require('../constants/app');

const sendJsonResponse = (res, message = null, data = null, code = responseCode.OK) => {
  const httpStatus = responseStatus[code] || responseStatus.OK;
  const resp = JSON.stringify({
    status: code,
    data: data,
    message: message,
  });
  res.status(httpStatus).json(JSON.parse(resp));
};

module.exports = {
  sendJsonResponse,
};
