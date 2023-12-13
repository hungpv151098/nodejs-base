const Sequelize = require('sequelize');
const { appConfig } = require('../config');
const config = require('../databases/config/database.js')[appConfig.env];
const userModel = require('./user');
const messageModel = require('./message');
const contextModel = require('./context');
const gptRequestModel = require('./gpt-request');

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const UserModel = userModel(sequelize, Sequelize.DataTypes);
const MessageModel = messageModel(sequelize, Sequelize.DataTypes);
const ContextModel = contextModel(sequelize, Sequelize.DataTypes);
const GptRequestModel = gptRequestModel(sequelize, Sequelize.DataTypes);

const models = {
  users: UserModel,
  messages: MessageModel,
  contexts: ContextModel,
  gptRequests: GptRequestModel,
};

const db = {
  models: models,
  sequelize: sequelize,
  Sequelize: Sequelize,
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(db);
  }
});

module.exports = db;
