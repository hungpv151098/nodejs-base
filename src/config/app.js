const configs = {
  env: process.env.APP_ENV || 'production',
  host: process.env.APP_HOST,
  key: process.env.APP_KEY,
  logDriver: process.env.LOG_DRIVER,
  port: process.env.PORT || 3000,
  basePath: process.env.BASE_PATH || '/',
  defaultLang: 'en',
  logConsole: process.env.LOG_CONSOLE == 'true' || false,
};

module.exports = configs;
