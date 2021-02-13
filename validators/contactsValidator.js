const {body} = require('express-validator');

const createContactRules = [
  body('value')
    .notEmpty()
    .withMessage('Contact value can not be empty')
    .bail()
    .isLength({min: 2})
    .withMessage('Contact value length min 2 characters'),
  body('category').notEmpty().withMessage('Contact category can not be empty'),
  body('link')
    .isLength({max: 255})
    .withMessage('Max length of link is 255 characters'),
];

const updateContactRules = [
  body('value')
    .notEmpty()
    .withMessage('Contact value can not be empty')
    .bail()
    .isLength({min: 2})
    .withMessage('Contact value length min 2 characters'),
  body('category').notEmpty().withMessage('Contact category can not be empty'),
  body('link')
    .isLength({max: 255})
    .withMessage('Max length of link is 255 characters'),
];

module.exports = {createContactRules, updateContactRules};
