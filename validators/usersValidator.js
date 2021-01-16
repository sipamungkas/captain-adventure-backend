const {body, query} = require('express-validator');

const userSessionRules = () => [
  body('email').isEmail().withMessage('Invalid email format').bail(),
  body('password').isLength({min: 8}).withMessage('Password length min:8'),
];

const forgotPasswordRules = () => [
  body('email').isEmail().withMessage('Invalid email format'),
];

const newPasswordRules = () => [
  query('token').notEmpty().withMessage('Invalid reset token').bail(),
  body('password')
    .notEmpty()
    .withMessage('Password can not be empty')
    .bail()
    .isLength({min: 8})
    .withMessage('Password length min:8')
    .bail(),
  body('verifyPassword')
    .notEmpty()
    .withMessage('Verify password can not be empty')
    .bail()
    .isLength({min: 8})
    .withMessage('Password length min:8')
    .bail(),
];

module.exports = {userSessionRules, forgotPasswordRules, newPasswordRules};
