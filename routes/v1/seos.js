const express = require('express');
const seosController = require('../../controllers/seosController');

const {authenticateToken} = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, seosController.getSeoList);
router.get('/:page', seosController.getSeoByPage);
router.post('/:page', authenticateToken, seosController.updateOrInsert);

module.exports = router;
