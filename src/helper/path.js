const path = require('path');

const rootPath = (filePath = '') => {
  return path.resolve(__dirname, '../../', filePath);
};

const commandDataPath = (filePath = '') => {
  return path.resolve(__dirname, '../commands/data', filePath);
};

const publicPath = (filePath = '') => {
  return path.resolve(rootPath(), 'public', filePath);
};

const srcPath = (filePath = '') => {
  return path.resolve(rootPath(), 'src', filePath);
};

const logPath = (filePath = '') => {
  return path.resolve(rootPath(), 'logs', filePath);
};

module.exports = {
  rootPath,
  commandDataPath,
  publicPath,
  srcPath,
  logPath,
};
