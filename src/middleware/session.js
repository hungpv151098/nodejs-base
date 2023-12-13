const session = require('express-session');
const { createClient } = require('redis');
const { default: RedisStore } = require('connect-redis');
const { redisConfig, appConfig } = require('../config');
const { isProduction } = require('../helper/utils');

const makeSessionMiddleware = () => {
    const redisClient = createClient(redisConfig);
    redisClient.connect().catch(console.error);
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: 'aicrgpt:',
    });

    const sessionConfig = {
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: true, // recommended: only save session when data exists
        secret: appConfig.key,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: false,
        },
    };

    if (isProduction()) {
        sessionConfig.cookie.secure = true; // serve secure cookies
    }

    return session(sessionConfig);
};

module.exports = {
    makeSessionMiddleware,
};
