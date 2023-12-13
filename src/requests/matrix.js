const { body } = require('express-validator/src/middlewares/validation-chain-builders');

const voteRequestValidation = [
  body('txHash')
    .isString()
    .withMessage('validate.isString')
    .bail()
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('validate.required'),
];

module.exports = {
  voteRequestValidation,
};
