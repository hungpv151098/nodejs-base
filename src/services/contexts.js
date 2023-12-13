const { models } = require('../models');
const { contextCollection } = require('../resources/context');

const getContexts = async userId => {
  const contexts = await models.contexts.findAll({
    where: {
      userId,
    },
  });
  return contextCollection(contexts);
};

const deleteContext = async (userId, contextId) => {
  return await models.contexts.destroy({
    where: {
      id: contextId,
      userId,
    },
  });
};

module.exports = {
  getContexts,
  deleteContext,
};
