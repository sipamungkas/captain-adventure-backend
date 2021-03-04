const {body} = require('express-validator');

const updateOrCreateSettingsRules = [
  body().isArray().withMessage('settings must be an array object'),
  body('*.key')
    .notEmpty()
    .withMessage('Key can not be empty')
    .bail()
    .isString()
    .withMessage('Key must be a string'),
  body('*.value')
    .notEmpty()
    .withMessage('Value can not be empty')
    .bail()
    .isString()
    .withMessage('Value must be a string'),
  body('*.group')
    .notEmpty()
    .withMessage('Group can not be empty')
    .bail()
    .isString()
    .withMessage('Group must be a string'),
];

module.exports = {updateOrCreateSettingsRules};
