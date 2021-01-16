const express = require('express');
const categoriesController = require('../../controllers/categoriesController');
const {
  createCategoryRules,
  updateCategoryRules,
} = require('../../validators/categoriesValidator');
const validate = require('../../validators/validate');
const {authenticateToken} = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  createCategoryRules(),
  validate,
  categoriesController.createCategory,
);

router.get('/', authenticateToken, categoriesController.getCategories);
router.get('/:id', authenticateToken, categoriesController.getCategory);
router.put(
  '/:id',
  authenticateToken,
  updateCategoryRules(),
  validate,
  categoriesController.updateCategory,
);
router.delete('/:id', authenticateToken, categoriesController.deleteCategory);

module.exports = router;
