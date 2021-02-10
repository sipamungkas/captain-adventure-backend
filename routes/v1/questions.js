const express = require('express');
const questionsController = require('../../controllers/questionsController');
const {authenticateToken} = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, questionsController.getQuestions);

module.exports = router;
