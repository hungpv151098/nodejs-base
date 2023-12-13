const i18next = require('i18next');
const i18nextHttpMiddleware = require('i18next-http-middleware');
const i18nextFsBackend = require('i18next-fs-backend');
const { srcPath } = require('../helper/path');

i18next
  .use(i18nextHttpMiddleware.LanguageDetector)
  .use(i18nextFsBackend)
  .init({
    preload: ['en', 'vi'],
    ns: ['common'],
    fallbackLng: 'en',
    backend: {
      loadPath: srcPath('locales/{{lng}}/{{ns}}.json'),
      addPath: srcPath('locales/{{lng}}/{{ns}}.missing.json'),
    },
  });

const middleware = i18nextHttpMiddleware.handle(i18next);

module.exports = middleware;
