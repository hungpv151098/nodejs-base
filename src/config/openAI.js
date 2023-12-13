const configs = {
  openAIAPIKey: process.env.OPENAI_API_KEY || 0,
  openAIMaxRetries: parseInt(process.env.OPENAI_MAX_RETRIES) || 0,
  openAIModel: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
};

module.exports = configs;
