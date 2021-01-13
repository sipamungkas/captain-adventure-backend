const {body} = require('express-validator');

const userSessionRules = () => [
  body('email').isEmail().withMessage('Email can not empty').bail(),
  body('password').isLength({min: 8}).withMessage('Password length min:8'),
];

module.exports = {userSessionRules};
