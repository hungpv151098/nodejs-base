const rateLimit = require('express-rate-limit');
const { limiterConfig } = require('../config');
const { responseCode } = require('../constants/app');

const makeRateLimitMiddleware = rateLimitConfig => {
  return rateLimit({
    windowMs: rateLimitConfig.windowMs || limiterConfig.default.windowMs,
    max: rateLimitConfig.max || limiterConfig.default.max,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: rateLimitConfig.keyGenerator || undefined,
    message: async (req, res) => {
      return res.json({
        code: responseCode.TOO_MANY_REQUESTS,
        data: null,
        message: req.t('error.tooManyRequests'),
      });
    },
  });
};

const defaultRateLimit = makeRateLimitMiddleware(limiterConfig.default);

module.exports = {
  defaultRateLimit,
  makeRateLimitMiddleware,
};
