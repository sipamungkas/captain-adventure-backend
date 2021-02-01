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
    .isLength({min: 3})
    .withMessage('Hero short description length min 3 characters')
    .bail(),
];

module.exports = {createHeroRules};
