const {body} = require('express-validator');

const createGalleryRules = [
  body('alt')
    .notEmpty()
    .withMessage('Gallery alt text can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Gallery alt text length min 3 characters'),
];

module.exports = {createGalleryRules};
