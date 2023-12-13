const { makeLogger } = require('../services/winston');

const makeGlobalLog = (pathName, level = 'debug') => {
  global.log = makeLogger(pathName, level);
};

const getCurrentLog = () => {
  return (
    global.log || {
      info: console.info,
      error: console.error,
    }
  );
};

const logInfo = message => {
  const log = getCurrentLog();
  if (log) {
    log.info(message);
  }
};

module.exports = {
  makeGlobalLog,
  getCurrentLog,
  logInfo,
};
