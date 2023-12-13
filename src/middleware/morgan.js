const morgan = require('morgan');

const middleware = morgan('dev');

module.exports = middleware;
