const {body} = require('express-validator');

const createBlogPostRules = [
  body('title')
    .notEmpty()
    .withMessage('Post title can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Post title length min 3 characters')
    .bail(),
  body('body')
    .notEmpty()
    .withMessage('Post short description can not be empty')
    .bail()
    .isLength({min: 100})
    .withMessage('Post short description length min 100 characters')
    .bail(),
];

module.exports = {createBlogPostRules};
