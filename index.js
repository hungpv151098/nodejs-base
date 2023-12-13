#!/usr/bin/env node

const http = require('http');
const { appConfig } = require('./src/config');
const app = require('./src/app');
const { makeGlobalLog } = require('./src/helper/log');
const { sequelize } = require('./src/models/index');

if (appConfig.logDriver == 'winston') {
  makeGlobalLog('index');
}

const mysqlConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const server = http.createServer(app);

server.on('listening', () => {
  console.log(`http://127.0.0.1:${appConfig.port}`);
  console.log(`http://127.0.0.1:${appConfig.port}${appConfig.basePath}`);
});

server.on('error', e => {
  if (e.syscall !== 'listen') throw e;
  if (e.code === 'EACCES') {
    console.log('Port privileges');
    process.exit(1);
  }
  if (e.code === 'EADDRINUSE') {
    console.log('Port in use');
    process.exit(1);
  }
  throw e;
});

Promise.all([mysqlConnect()]).then(async () => {
  server.listen(appConfig.port);
});
