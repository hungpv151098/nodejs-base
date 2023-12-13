const Queue = require('bee-queue');
const redis = require('redis');
const { queueName, workerName } = require('../constants/queue');
const { queueConfig } = require('../config');
const testQueue = require('./testQueue');

const queueProcessors = [
  {
    name: queueName.DEFAULT,
    worker: workerName.DEFAULT,
    handler: testQueue,
  },
];

const makeMainSettings = () => {
  const sharedConfig = {
    getEvents: false,
    isWorker: false,
    prefix: queueConfig.prefix,
    redis: redis.createClient(queueConfig.redis),
  };
  return sharedConfig;
};

const makeWorkerSettings = () => {
  const sharedConfig = {
    prefix: queueConfig.prefix,
    redis: redis.createClient(queueConfig.redis),
  };

  return sharedConfig;
};

const createQueue = (name, settings) => {
  return new Queue(name, settings);
};

module.exports = {
  queueProcessors,
  makeMainSettings,
  makeWorkerSettings,
  createQueue,
};
