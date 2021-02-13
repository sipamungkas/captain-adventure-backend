const {body} = require('express-validator');

const createPacketRules = [
  body('title')
    .notEmpty()
    .withMessage('Packet title can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Packet title min 3 characters')
    .bail(),
  body('perks')
    .isLength({max: 255})
    .withMessage('Maximum perks length is 255 Characters')
    .bail(),
  body('short_description')
    .isLength({max: 255})
    .withMessage('Maximum short description length is 255 Characters'),
  body('start_at')
    .isLength({max: 255})
    .withMessage('Maximum start_at length is 50 Characters'),
  body('subtitle')
    .isLength({max: 255})
    .withMessage('Maximum subtitle length is 100 Characters'),
  body('description')
    .notEmpty()
    .withMessage('Packet description can not be empty')
    .bail()
    .isLength({min: 25})
    .withMessage('Packed description must greater than 25 characters')
    .bail(),
  body('category_id')
    .notEmpty()
    .withMessage('Please select the category')
    .bail(),
];

module.exports = {
  createPacketRules,
};
