#!/usr/bin/env node

const { sequelize } = require('./src/models/index');
const { queueProcessors } = require('./src/queue');
const { processQueues } = require('./src/queueWorker');
const { logDriver } = require('./src/config');

if (logDriver == 'winston') {
  const { makeGlobalLog } = require('./src/libs/log');
  makeGlobalLog('queue');
}

const mysqlConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const getWorkerNames = workerNameStr => {
  if (!workerNameStr) {
    return [];
  }

  const workerNames = workerNameStr.split(',');
  const workerArr = [];
  for (let i = 0; i < workerNames.length; i++) {
    const workerName = workerNames[i].trim();
    if (workerName) {
      workerArr.push(workerName);
    }
  }

  return workerArr;
};

const getQueueProcessorsByWorkerNames = workerNames => {
  const queueProcessorsRun = [];

  for (let i = 0; i < queueProcessors.length; i++) {
    const queueProcessor = queueProcessors[i];
    if (workerNames.includes(queueProcessor.worker)) {
      queueProcessorsRun.push(queueProcessor);
    }
  }

  return queueProcessorsRun;
};

const run = () => {
  const workerNameStr = process.argv[2];
  const workerNames = getWorkerNames(workerNameStr);
  if (!workerNames.length) {
    console.log('Worker name missing');
    return;
  }

  const queueProcessorsRun = getQueueProcessorsByWorkerNames(workerNames);
  if (!queueProcessorsRun.length) {
    console.log('No queue');
  }

  processQueues(queueProcessorsRun);
};

Promise.all([mysqlConnect()]).then(() => {
  run();
});
