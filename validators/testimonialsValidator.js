const {body} = require('express-validator');

const createTestimonialRules = [
  body('name')
    .notEmpty()
    .withMessage('Testimonial name can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Testimonial name length min 3 characters'),
  body('testimoni')
    .notEmpty()
    .withMessage('Testimonial testimoni text can not be empty')
    .bail()
    .isLength({min: 50})
    .withMessage('Testimonial testimoni text length min 50 characters'),
  body('order').notEmpty().withMessage('Testimonial order can not be empty'),
];

module.exports = {createTestimonialRules};
