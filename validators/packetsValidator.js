const {check} = require('express-validator');

const createPacketRules = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Packet title can not be empty')
    .bail()
    .isLength({min: 3})
    .withMessage('Packet title min 3 characters')
    .bail(),
  check('description')
    .notEmpty()
    .withMessage('Packet description can not be empty')
    .bail()
    .isLength({min: 25})
    .withMessage('Packed description must greater than 25 characters')
    .bail(),
  check('category_id')
    .notEmpty()
    .withMessage('Please select the category')
    .bail(),
];

module.exports = {
  createPacketRules,
};
