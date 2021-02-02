const {body} = require('express-validator');

const createProgramRules = [
  body('title')
    .notEmpty()
    .withMessage('Program can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Program length min 3 characters')
    .bail(),
  body('body')
    .notEmpty()
    .withMessage('Program short description can not be empty')
    .bail()
    .isLength({min: 100})
    .withMessage('Program short description length min 100 characters')
    .bail(),
];

module.exports = {createProgramRules};
