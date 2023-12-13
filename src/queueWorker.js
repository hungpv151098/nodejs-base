const { logInfo } = require('./helper/log');
const { makeWorkerSettings, createQueue } = require('./queue/index');

const sharedConfig = makeWorkerSettings();

const processQueue = queueProcessor => {
  if (!queueProcessor) {
    logInfo('Queue Processor not found');
    return;
  }

  logInfo(`Add queue ${queueProcessor.name} to process`);
  const queueInstance = createQueue(queueProcessor.name, sharedConfig);
  queueInstance.process(queueProcessor.handler);
};

const processQueues = queueProcessors => {
  for (let i = 0; i < queueProcessors.length; i++) {
    processQueue(queueProcessors[i]);
  }
};

module.exports = {
  sharedConfig,
  processQueues,
};
