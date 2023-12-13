const { Telegraf } = require('telegraf');
const moment = require('moment');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_LOG_GROUP_ID } = require('../configs/telegram');

const init = () => {
  global.teleBot = new Telegraf(TELEGRAM_BOT_TOKEN);

  return global.teleBot;
};

const bot = () => {
  return global.teleBot;
};

const sendMessage = (groupId, message) => {
  const teleBot = bot();
  teleBot.telegram.sendMessage(groupId, message, { parse_mode: 'html' });
};

const sendLogMessage = message => {
  const date = moment().format('YYYY-MM-DD HH:mm:ss');
  const title = `<b>[WARNING] ${date}</b>\n`;

  return sendMessage(TELEGRAM_LOG_GROUP_ID, title + message);
};

module.exports = {
  init,
  bot,
  sendMessage,
  sendLogMessage,
};
