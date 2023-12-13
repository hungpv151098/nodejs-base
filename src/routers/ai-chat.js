const aiChatController = require('../controllers/ai-chat');
const { getMessagesValidation, messagesValidation } = require('../requests/ai-chat');

const aiChatRouter = [
  {
    url: '/ai-chat/contexts',
    action: aiChatController.getContexts,
    method: 'get',
    auth: true,
  },
  {
    url: '/ai-chat/contexts/:contextId',
    action: aiChatController.deleteContext,
    method: 'delete',
    auth: true,
  },
  {
    url: '/ai-chat/messages',
    action: aiChatController.getMessages,
    validation: getMessagesValidation,
    method: 'get',
    auth: true,
  },
  {
    url: '/ai-chat/messages',
    action: aiChatController.sendMessage,
    validation: messagesValidation,
    method: 'post',
    auth: true,
  },
];

module.exports = aiChatRouter;
