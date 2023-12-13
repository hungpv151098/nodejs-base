const express = require('express');
const i18nextMiddleware = require('./middleware/i18next');
const corsMiddleware = require('./middleware/cors');
const morganMiddleware = require('./middleware/morgan');
const { makeSessionMiddleware } = require('./middleware/session');
const router = require('./router');
const { appConfig } = require('./config');
const { rootPath } = require('./helper/path');
const { responseCode } = require('./constants/app');
const { sendJsonResponse } = require('./helper/response');

const app = express();

app.set('trust proxy', true);

app.use(i18nextMiddleware);
app.use(corsMiddleware);
app.use(morganMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(makeSessionMiddleware());

app.use(appConfig.basePath, router);
app.use('/', express.static(rootPath('public')));

app.all('*', function (req, res) {
  return sendJsonResponse(res, req.t('error.pageNotFound'), null, responseCode.END_POINT_NOT_FOUND);
});

module.exports = app;
