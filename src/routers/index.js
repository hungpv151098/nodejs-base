const homeRouters = require('./home');
const authRouters = require('./auth');
const aiChatRoutes = require('./ai-chat');

const routers = [...homeRouters, ...authRouters, ...aiChatRoutes];

module.exports = routers;
