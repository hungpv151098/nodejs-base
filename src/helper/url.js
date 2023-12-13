const config = require('../config');

const imageUrl = (filePath = '') => {
  return config.host + '/images/' + filePath;
};

module.exports = {
  imageUrl,
};
