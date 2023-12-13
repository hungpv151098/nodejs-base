const { Router } = require('express');
const routes = require('./routers');
const { processAction, processMiddleware } = require('./helper/processor');
const authUserMiddleware = require('./middleware/authUser');
const { makeRateLimitMiddleware, defaultRateLimit } = require('./middleware/rateLimit');
const { handleValidationMiddleware } = require('./middleware/validation');

const router = Router();

const globalMiddleware = [];

routes.forEach(route => {
  const actions = [].concat(globalMiddleware);

  if (route.auth) {
    actions.push(processMiddleware(authUserMiddleware));
  }

  if (route.rateLimit) {
    actions.push(route.rateLimit === true ? defaultRateLimit : makeRateLimitMiddleware(route.rateLimit));
  }

  if (route.validation) {
    actions.push(route.validation);
    actions.push(processMiddleware(handleValidationMiddleware));
  }

  actions.push(processAction(route.action, !!route.needSqlTransaction));
  router[(route.method || 'get').toLowerCase()](route.url, actions);
});

module.exports = router;
