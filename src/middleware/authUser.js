const { responseCode } = require('../constants/app');
const { throwError } = require('../helper/utils');
const { models } = require('../models');

const throwUnauthorized = req => {
  throwError({
    message: req.t('auth.tokenWrong'),
    code: responseCode.UNAUTHORIZED,
  });
};

const getUserBySession = async req => {
  const sessionId = req.session.id;
  if (!sessionId) {
    return null;
  }

  let user = await models.users.findOne({
    where: { session: sessionId },
    attributes: ['id', 'session'],
  });

  if (!user) {
    user = await models.users.create({
      session: sessionId,
      clientIp: req.ip,
    });
  }

  req.session.userId = user.id;
  req.session.save();

  return user;
};

const authUser = async (req, res) => {
  const user = await getUserBySession(req);
  if (!user) {
    return throwUnauthorized(req);
  }

  req.user = user;
};

module.exports = authUser;
