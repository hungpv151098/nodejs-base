const pingController = require('../controllers/ping');

const homeRouter = [
  {
    url: '/',
    action: pingController.ping,
    method: 'get',
  },
];

module.exports = homeRouter;
