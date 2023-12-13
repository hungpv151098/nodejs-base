const { query, body } = require('express-validator');

const getMessagesValidation = [
  query('contextId').exists().withMessage('validate.required').isInt().withMessage('validate.isInteger'),
  query('cursor').isInt().withMessage('validate.isInteger').optional({ nullable: true }),
  query('limit').isInt().withMessage('validate.isInteger').optional({ nullable: true }),
];

const messagesValidation = [body('content').exists().withMessage('validate.required').isLength({ min: 0, max: 1000 })];

module.exports = {
  getMessagesValidation,
  messagesValidation,
};
