const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const appConfig = require('./app');
const corsConfig = require('./cors');
const mysqlConfig = require('./mysql');
const queueConfig = require('./queue');
const limiterConfig = require('./limiter');
const redisConfig = require('./redis');
const openAIConfig = require('./openAI');

module.exports = {
  appConfig: appConfig,
  corsConfig: corsConfig,
  mysqlConfig: mysqlConfig,
  queueConfig: queueConfig,
  limiterConfig: limiterConfig,
  redisConfig: redisConfig,
  openAIConfig: openAIConfig,
};
