const {body} = require('express-validator');

const sendQuestionRules = [
  body('name')
    .notEmpty()
    .withMessage('Category Name can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Category name min 3 characters'),
  body('email').isEmail().withMessage('Email invalid').bail(),
  body('body')
    .notEmpty()
    .withMessage('Question body can not be empty')
    .bail()
    .isLength({min: 10})
    .withMessage('Question body min 10 Character'),
];

module.exports = {sendQuestionRules};
