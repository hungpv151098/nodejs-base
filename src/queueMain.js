const { queueNameArr } = require('./constants/queue');
const { makeMainSettings, createQueue } = require('./queue');

let queueInstances = {};
let shareSettings = null;

const getQueue = name => {
  if (!queueNameArr.includes(name)) {
    throw new Error('Queue name ' + name + ' not found');
  }

  if (!shareSettings) {
    shareSettings = makeMainSettings();
  }

  if (!queueInstances[name]) {
    queueInstances[name] = createQueue(name, shareSettings);
  }

  return queueInstances[name];
};

const closeAllQueue = async () => {
  const keys = Object.keys(queueInstances);

  for (let i = 0; i < keys.length; i++) {
    await queueInstances[keys[i]].close();
    delete queueInstances[keys[i]];
  }
};

module.exports = {
  queueInstances,
  getQueue,
  closeAllQueue,
};
