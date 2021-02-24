const express = require('express');
const captchaController = require('../../controllers/captchaController');

const router = express.Router();

router.get('/', captchaController.getCaptcha);
router.post('/', captchaController.checkCaptcha);

module.exports = router;
