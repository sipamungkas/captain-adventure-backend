const {body} = require('express-validator');

const createGalleryRules = [
  body('title')
    .notEmpty()
    .withMessage('Gallery title text can not be empty')
    .bail()
    .isLength({min: 3, max: 255})
    .withMessage(
      'Gallery title text min length is 3 characters and max length is 255 characters',
    ),
  body('alt')
    .notEmpty()
    .withMessage('Gallery alt text can not be empty')
    .bail()
    .isLength({min: 3, max: 255})
    .withMessage(
      'Gallery alt text min length is 3 characters and max length is 255 characters',
    ),
];

module.exports = {createGalleryRules};
