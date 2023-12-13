const cors = require('cors');
const { corsConfig } = require('../config');

const middleware = cors({
  origin: corsConfig.origin,
});

module.exports = middleware;
