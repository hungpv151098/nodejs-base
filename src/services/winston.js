const { createLogger, format, transports } = require('winston');
const { logConsole } = require('../config/app');
require('winston-daily-rotate-file');
const { logPath } = require('../helper/path');

const formatLog = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${JSON.stringify(message, null, 2)}`;
});

const makeLogger = (folder, level = 'debug') => {
  const transportsArr = [
    new transports.DailyRotateFile({
      filename: 'combined-%DATE%.log',
      dirname: logPath(folder),
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '14d',
    }),
  ];

  if (logConsole) {
    transportsArr.push(new transports.Console());
  }

  const logger = createLogger({
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), formatLog),
    transports: transportsArr,
    level: level,
  });

  return logger;
};

module.exports = {
  makeLogger,
};
