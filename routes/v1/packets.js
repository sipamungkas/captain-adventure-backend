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

router.get('/', authenticateToken, packetsController.getPackets);
router.get('/:id', authenticateToken, packetsController.getPacket);
router.put(
  '/:id',
  authenticateToken,
  uploadPacketImage,
  packetsController.updatePacket,
);
router.delete('/:id', authenticateToken, packetsController.deletePacket);

module.exports = router;
