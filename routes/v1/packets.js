const express = require('express');
const packetsController = require('../../controllers/packetsController');
const {createPacketRules} = require('../../validators/packetsValidator');
const validate = require('../../validators/validate');
const {authenticateToken} = require('../../middlewares/authMiddleware');
const {uploadPacketImage} = require('../../middlewares/multerMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadPacketImage,
  createPacketRules,
  validate,
  packetsController.createPacket,
);

module.exports = router;
