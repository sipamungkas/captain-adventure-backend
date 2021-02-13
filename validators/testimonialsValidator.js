const {body} = require('express-validator');

const createTestimonialRules = [
  body('name')
    .notEmpty()
    .withMessage('Testimonial name can not be empty')
    .bail()
    .isLength({min: 3, max: 255})
    .withMessage('Testimonial name length must be between 3-255 characters'),
  body('position')
    .notEmpty()
    .withMessage('Position can not be empty')
    .bail()
    .isLength({min: 3, max: 255})
    .withMessage(
      'Testimonial position length must be between 3-255 characters',
    ),
  body('testimoni')
    .notEmpty()
    .withMessage('Testimonial testimoni text can not be empty')
    .bail()
    .isLength({min: 50})
    .withMessage('Min length of Testimonial testimoni is 50 characters'),
];

module.exports = {createTestimonialRules};
