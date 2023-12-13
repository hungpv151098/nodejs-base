const OpenAI = require('openai');
const { openAIConfig } = require('../config');
const { models } = require('../models');

const sendMessage = async messages => {
  const openai = new OpenAI({
    apiKey: openAIConfig.openAIAPIKey,
    maxRetries: openAIConfig.openAIMaxRetries, // default is 2
  });
  const input = {
    model: openAIConfig.openAIModel,
    messages,
    stream: false,
  };
  const response = await openai.chat.completions.create(input);
  const gptRequest = await models.gptRequests.create({
    model: openAIConfig.openAIModel,
    input: messages,
    output: response,
  });

  const message = { id: gptRequest.id, message: response?.choices[0]?.message };
  return message;
};

module.exports = { sendMessage };
