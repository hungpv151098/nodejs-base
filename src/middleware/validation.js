const { validationResult } = require('express-validator');
const { responseCode } = require('../constants/app');
const { formatValidateMessage, throwError } = require('../helper/utils');

const throwValidation = (req, errors) => {
  throwError({
    message: req.t('error.validationError'),
    code: responseCode.VALIDATION_ERROR,
    errors: formatValidateMessage(errors, req),
  });
};

const handleValidationMiddleware = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throwValidation(req, errors.array());
  }
};

module.exports = {
  handleValidationMiddleware,
};
