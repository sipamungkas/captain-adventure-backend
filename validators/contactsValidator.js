const {body} = require('express-validator');

const createContactRules = [
  body('key')
    .notEmpty()
    .withMessage('Contact key can not be empty')
    .bail()
    .isLength({min: 2})
    .withMessage('Contact alt length min 2 characters'),
  body('value')
    .notEmpty()
    .withMessage('Contact value can not be empty')
    .bail()
    .isLength({min: 2})
    .withMessage('Contact value length min 2 characters'),
  body('category').notEmpty().withMessage('Contact category can not be empty'),
];

const updateContactRules = [
  body('value')
    .notEmpty()
    .withMessage('Contact value can not be empty')
    .bail()
    .isLength({min: 2})
    .withMessage('Contact value length min 2 characters'),
  body('category').notEmpty().withMessage('Contact category can not be empty'),
];

module.exports = {createContactRules, updateContactRules};
