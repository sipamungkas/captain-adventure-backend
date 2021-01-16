const express = require('express');
const usersController = require('../../controllers/usersController');
const {
  userSessionRules,
  forgotPasswordRules,
  newPasswordRules,
} = require('../../validators/usersValidator');
const validate = require('../../validators/validate');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/* POST users credentials. */
router.post(
  '/session',
  userSessionRules(),
  validate,
  usersController.getSession,
);

router.post(
  '/forgot',
  forgotPasswordRules(),
  validate,
  usersController.forgotPassword,
);

router.post(
  '/reset-password',
  newPasswordRules(),
  validate,
  usersController.resetPassword,
);

module.exports = router;
