const {body} = require('express-validator');

const createBlogPostRules = [
  body('title')
    .notEmpty()
    .withMessage('Post title can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Post title length min 3 characters'),
  body('perks')
    .isLength({max: 255})
    .withMessage('Maximum perks length is 255 Characters')
    .bail(),
  body('short_description')
    .isLength({max: 255})
    .withMessage('Maximum short description length is 255 Characters'),
  body('body')
    .notEmpty()
    .withMessage('Post short description can not be empty')
    .bail()
    .isLength({min: 100})
    .withMessage('Post short description length min 100 characters'),
];

module.exports = {createBlogPostRules};
