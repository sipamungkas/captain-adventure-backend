const {body} = require('express-validator');

const sendQuestionRules = [
  body('name')
    .notEmpty()
    .withMessage('Category Name can not be empty')
    .bail()
    .isLength({min: 3, max: 255})
    .withMessage(
      'Min Name Length is 3 characters and max name length is 255 characters',
    ),
  body('email')
    .isEmail()
    .withMessage('Email invalid')
    .bail()
    .isLength({max: 255})
    .withMessage('max Email length is 255'),
  body('body')
    .notEmpty()
    .withMessage('Question body can not be empty')
    .bail()
    .isLength({min: 10})
    .withMessage('Question body min 10 Character'),
];

module.exports = {sendQuestionRules};
