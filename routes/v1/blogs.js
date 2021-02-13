const express = require('express');
const blogsController = require('../../controllers/blogsController');
const {createBlogPostRules} = require('../../validators/blogsValidator');
const validate = require('../../validators/validate');
const {authenticateToken} = require('../../middlewares/authMiddleware');
const {uploadBlogpostImage} = require('../../middlewares/multerMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadBlogpostImage,
  createBlogPostRules,
  validate,
  blogsController.createBlogPost,
);
router.get('/', authenticateToken, blogsController.getBlogsPost);
router.get('/:id', authenticateToken, blogsController.getBlogPost);
router.put(
  '/:id',
  authenticateToken,
  uploadBlogpostImage,
  createBlogPostRules,
  blogsController.updateBlogPost,
);
router.delete('/:id', authenticateToken, blogsController.deleteBlogPost);
router.post(
  '/upload-image',
  authenticateToken,
  uploadBlogpostImage,
  blogsController.uploadPostImage,
);

module.exports = router;
