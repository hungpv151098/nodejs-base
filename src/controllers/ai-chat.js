const { messageList, messageItem, contextCollection, responseGPTItem } = require('../resources/context');
const contextService = require('../services/contexts');
const messageService = require('../services/messages');

const getContexts = async req => {
  const user = req.user;
  const contexts = await contextService.getContexts(user.id);
  return contextCollection(contexts);
};

const deleteContext = async req => {
  const user = req.user;
  const contextId = req.params.contextId;
  return await contextService.deleteContext(user.id, contextId);
};

const getMessages = async req => {
  const user = req.user;
  const { contextId, cursor, limit } = req.query;
  const messages = await messageService.getMessages(user.id, contextId, cursor, limit);
  return messageList(messages);
};

const sendMessage = async req => {
  const user = req.user;
  const { contextId, content } = req.body;
  const message = await messageService.sendMessage(user.id, contextId, content);
  return responseGPTItem(message);
};

module.exports = {
  getContexts,
  deleteContext,
  getMessages,
  sendMessage,
};
