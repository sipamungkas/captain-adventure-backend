const {body, param} = require('express-validator');

const createCategoryRules = [
  body('name')
    .notEmpty()
    .withMessage('Category Name can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Category name min 3 characters'),
];

const updateCategoryRules = [
  param('id').notEmpty().withMessage('Category Id can not be empty').bail(),
  body('name')
    .notEmpty()
    .withMessage('Category Name can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Category name min 3 characters'),
];

module.exports = {createCategoryRules, updateCategoryRules};
