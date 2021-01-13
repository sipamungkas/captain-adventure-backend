const {body} = require('express-validator');

const userSessionRules = () => [
  body('email').isEmail().withMessage('Invalid email format').bail(),
  body('password').isLength({min: 8}).withMessage('Password length min:8'),
];

const forgotPasswordRules = () => [
  body('email').isEmail().withMessage('Invalid email format'),
];

module.exports = {userSessionRules, forgotPasswordRules};
