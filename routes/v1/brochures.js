const express = require('express');
const brochuresController = require('../../controllers/brochuresController');
const {authenticateToken} = require('../../middlewares/authMiddleware');
const {uploadBrochure} = require('../../middlewares/multerMiddleware');

const router = express.Router();
router.post(
  '/',
  authenticateToken,
  uploadBrochure,
  brochuresController.uploadBochure,
);
router.get('/', brochuresController.getBrochure);
module.exports = router;
