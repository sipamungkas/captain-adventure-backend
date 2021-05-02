const express = require('express');
const seosController = require('../../controllers/seosController');

const {authenticateToken} = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, seosController.getSeoList);

module.exports = router;
