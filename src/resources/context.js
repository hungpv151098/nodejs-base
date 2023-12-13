const dayjs = require('dayjs');
const { role } = require('../constants/message');

const contextItem = entity => {
  return {
    id: entity.id,
    title: entity.title,
    createdAt: +dayjs(entity.createdAt),
  };
};

const contextCollection = entities => {
  const entitiesFormatted = [];
  for (let i = 0; i < entities.length; i++) {
    entitiesFormatted.push(contextItem(entities[i]));
  }

  return entitiesFormatted;
};

const messageItem = entity => {
  return {
    id: entity.id,
    role: entity.userId === null ? role.ASSISTANT : role.USER,
    content: entity.content,
    createdAt: +dayjs(entity.createdAt),
  };
};

const messageCollection = entities => {
  const entitiesFormatted = [];
  for (let i = 0; i < entities.length; i++) {
    entitiesFormatted.push(messageItem(entities[i]));
  }
  return entitiesFormatted;
};

const messageList = entity => {
  return {
    nextCursor: entity.nextCursor,
    limit: entity.limit,
    messages: messageCollection(entity.messages),
  };
};

const responseGPTItem = entity => {
  return {
    context: contextItem(entity?.context),
    user: messageItem(entity?.user),
    assistant: messageItem(entity?.assistant),
  };
};

module.exports = {
  contextItem,
  contextCollection,
  messageItem,
  messageCollection,
  messageList,
  responseGPTItem,
};
