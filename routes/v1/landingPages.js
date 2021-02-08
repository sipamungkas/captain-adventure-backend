const express = require('express');
const landingPageController = require('../../controllers/landingPageController');

const router = express.Router();

router.get('/home', landingPageController.home);

module.exports = router;
