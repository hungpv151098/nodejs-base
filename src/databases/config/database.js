const { mysqlConfig } = require('../../config');

module.exports = {
  development: mysqlConfig,
  production: mysqlConfig,
};
