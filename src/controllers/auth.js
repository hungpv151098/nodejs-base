const me = async req => {
  const user = req.user;
  return user;
};

module.exports = {
  me,
};
