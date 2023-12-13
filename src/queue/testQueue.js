const { logInfo } = require('../helper/log');

const handleTestJob = async data => {
  console.log(data);
};

const handleJob = async (job, done) => {
  logInfo('Begin job: ' + Date.now());
  try {
    await handleTestJob(job.data);
  } catch (error) {
    logInfo(error.message);
  } finally {
    done();
  }
  logInfo('End job: ' + Date.now());
};

module.exports = handleJob;
