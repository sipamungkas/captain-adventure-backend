const {body} = require('express-validator');

const createProgramRules = [
  body('title')
    .notEmpty()
    .withMessage('Program can not be empty')
    .bail()
    .isLength({min: 3, max: 255})
    .withMessage(
      'Min title length is 3 characters and max title length is 255 characters',
    )
    .bail(),
  body('perks')
    .isLength({max: 255})
    .withMessage('Max perks length is 255 characters'),
  body('short description')
    .isLength({max: 255})
    .withMessage('Max short description length is 255 characters'),
  body('body')
    .notEmpty()
    .withMessage('Program body can not be empty')
    .bail()
    .withMessage(
      'Min title length is 3 characters and max title length is 255 characters',
    )
    .bail(),
];

module.exports = {createProgramRules};
