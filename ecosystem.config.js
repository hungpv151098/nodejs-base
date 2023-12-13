const apps = [
  {
    script: './index.js',
    name: 'base-node-main',
    log_date_format: 'HH:mm:ss MMDDYY',
    exec_mode: 'cluster',
    instances: 'max',
    autorestart: true,
  },
  // {
  //   script: './queue.js',
  //   args: 'claim_token',
  //   name: 'base-node-queue',
  //   log_date_format: 'HH:mm:ss MMDDYY',
  //   exec_mode: 'cluster',
  //   instances: 'max',
  //   autorestart: true,
  // },
];

module.exports = {
  apps: apps,
};
