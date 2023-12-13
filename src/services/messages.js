const { Op } = require('sequelize');
const { models } = require('../models');
const chatGPTService = require('../services/chatgpt');
const { trimWord, throwError } = require('../helper/utils');
const { role } = require('../constants/message');
const { responseMessage, responseStatus } = require('../constants/app');

const getMessages = async (userId, contextId, cursor, limit) => {
  const context = await models.contexts.findOne({
    where: {
      userId,
      id: contextId,
    },
  });
  if (!context) {
    return { nextCursor: 0, limit: parseInt(limit), messages: [] };
  }
  limit = limit || 10;
  let query = { contextId };
  if (typeof cursor !== 'undefined' || cursor) {
    query.id = { [Op.lt]: parseInt(cursor) };
  }

  if (parseInt(cursor) === 0) {
    return { nextCursor: parseInt(cursor), limit: parseInt(limit), messages: [] };
  }

  const messages = await models.messages.findAll({
    where: query,
    limit: parseInt(limit),
    order: [['id', 'DESC']],
  });
  const messagesSorted = messages?.sort((a, b) => a?.id - b?.id);
  const nextCursor = messagesSorted.length !== 0 ? messagesSorted[0].id : 0;
  return { nextCursor, limit: parseInt(limit), messages: messagesSorted };
};

const sendMessage = async (userId, contextId, content) => {
  const context = await getContextData(userId, contextId, content);
  const userMessage = await models.messages.create({
    userId,
    contextId: context?.id,
    content,
  });
  const sendMessageData = await getSendMessageData(userMessage);
  const data = await chatGPTService.sendMessage(sendMessageData);
  const assistantMessage = await models.messages.create({
    gptRequestId: data.id,
    contextId: context?.id,
    content: data?.message?.content,
  });
  await updateUserMessage(userMessage.id, data.id);
  return { context: context, user: userMessage, assistant: assistantMessage };
};

const getContextData = async (userId, contextId, content) => {
  let context = {};
  if (!contextId) {
    context = await createContext(userId, content);
  } else {
    context = await models.contexts.findOne({
      where: {
        id: contextId,
        userId,
      },
    });
    if (!context) {
      context = await createContext(userId, content);
    }
  }
  return context;
};

const createContext = async (userId, content) => {
  return await models.contexts.create({
    userId,
    title: trimWord(content),
  });
};

const getSendMessageData = async userMessage => {
  const messages = await models.messages.findAll({
    where: { id: { [Op.lte]: userMessage.id } },
    limit: 5,
    order: [['id', 'DESC']],
    raw: true,
  });

  const messagesSorted = messages?.sort((a, b) => a?.id - b?.id);
  return messagesSorted.map(item => {
    if (!item.userId) {
      return {
        role: role.ASSISTANT,
        content: item?.content,
      };
    }
    return {
      role: role.USER,
      content: item?.content,
    };
  });
};

const updateUserMessage = async (messageId, gptRequestId) => {
  return await models.messages.update(
    {
      gptRequestId,
    },
    {
      where: {
        id: messageId,
      },
    }
  );
};

module.exports = {
  getMessages,
  sendMessage,
};
