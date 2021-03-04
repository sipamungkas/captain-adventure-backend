const express = require('express');
const settingsController = require('../../controllers/settingsController');
const {authenticateToken} = require('../../middlewares/authMiddleware');
const validate = require('../../validators/validate');
const {
  updateOrCreateSettingsRules,
} = require('../../validators/settingsValidator');

const router = express.Router();

router.get('/', authenticateToken, settingsController.getSettings);
router.post(
  '/',
  authenticateToken,
  updateOrCreateSettingsRules,
  validate,
  settingsController.updateCreateSettings,
);

module.exports = router;
