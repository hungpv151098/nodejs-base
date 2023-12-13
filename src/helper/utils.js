const { appConfig } = require('../config');
const { responseCode } = require('../constants/app');
const { logInfo } = require('./log');

const isProduction = () => {
  return appConfig.env == 'prod' || appConfig.env == 'production';
};

const formatValidateMessage = (errors, req) => {
  return errors.map(item => {
    logInfo(item);
    const msg = req.t(item.msg);
    if (msg.includes(':attribute')) {
      return {
        message: msg.replace(':attribute', req.t('field.' + item.path)),
        field: item.param,
      };
    }
    return { message: msg, field: item.param };
  });
};

const throwError = ({ message, code, errors }) => {
  const e = new Error(message);

  e.code = code || responseCode.UNKNOWN_ERROR;
  e.data = errors || null;

  throw e;
};

const sendInputError = message => {
  return throwError({
    message: message,
    code: responseCode.BAD_REQUEST,
    status: 400,
  });
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const pluck = (arr, key) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i][key]);
  }
  return result;
};

const sum = (arr, key) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total = total + arr[i][key];
  }
  return total;
};

const isArray = value => value instanceof Array;

const isString = value => typeof value === 'string' || value instanceof String;

const isFunction = value => typeof value === 'function';

const randomItem = arr => (arr.length ? arr[Math.floor(Math.random() * arr.length)] : null);

const keyBy = (arr, key) => {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    result[item[key]] = item;
  }

  return result;
};

const toLowerCase = str => (isString(str) && str.toLowerCase()) || str;

const trimWord = str => {
  if (str.length <= 100) return str;
  var trimmedString = str.substr(0, 100);
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
  return trimmedString;
};

module.exports = {
  isProduction,
  sleep,
  pluck,
  sum,
  formatValidateMessage,
  throwError,
  sendInputError,
  isArray,
  isString,
  isFunction,
  randomItem,
  keyBy,
  toLowerCase,
  trimWord,
};
