const express = require('express');
const galleriesController = require('../../controllers/galleriesController');
const {createGalleryRules} = require('../../validators/galleriesValidator');
const validate = require('../../validators/validate');
const {authenticateToken} = require('../../middlewares/authMiddleware');
const {uploadGalleryImage} = require('../../middlewares/multerMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadGalleryImage,
  createGalleryRules,
  validate,
  galleriesController.createGallery,
);
router.get('/', authenticateToken, galleriesController.getGalleries);
router.get('/:id', authenticateToken, galleriesController.getGallery);
router.put(
  '/:id',
  authenticateToken,
  uploadGalleryImage,
  createGalleryRules,
  validate,
  galleriesController.updateGallery,
);
router.delete('/:id', authenticateToken, galleriesController.deleteGallery);

module.exports = router;
