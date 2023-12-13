const ping = async req => {
  return req.t('helloWorld');
};

module.exports = {
  ping,
};
