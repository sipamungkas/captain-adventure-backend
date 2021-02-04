const express = require('express');
const testimonialsController = require('../../controllers/testimonialsController');
const {
  createTestimonialRules,
} = require('../../validators/testimonialsValidator');
const validate = require('../../validators/validate');
const {authenticateToken} = require('../../middlewares/authMiddleware');
const {uploadTestimonialImage} = require('../../middlewares/multerMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadTestimonialImage,
  createTestimonialRules,
  validate,
  testimonialsController.createTestimonial,
);
router.get('/', authenticateToken, testimonialsController.getTestimonials);
router.get('/:id', authenticateToken, testimonialsController.getTestimonial);
router.put(
  '/:id',
  authenticateToken,
  uploadTestimonialImage,
  createTestimonialRules,
  validate,
  testimonialsController.updateTestimonial,
);
router.delete(
  '/:id',
  authenticateToken,
  testimonialsController.deleteTestimonial,
);

module.exports = router;
