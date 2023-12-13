const authController = require('../controllers/auth');

const routers = [
  {
    url: '/me',
    action: authController.me,
    auth: true,
    method: 'get',
  },
];

module.exports = routers;
