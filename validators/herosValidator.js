const {body} = require('express-validator');

const createHeroRules = [
  body('title')
    .notEmpty()
    .withMessage('Hero title can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Hero title length min 3 characters')
    .bail(),
  body('short_description')
    .notEmpty()
    .withMessage('Hero short description can not be empty')
    .bail()
    .isLength({min: 3, max: 255})
    .withMessage(
      'Hero short description min length is 3 characters, max length is 255 characters',
    )
    .bail(),
];

module.exports = {createHeroRules};
