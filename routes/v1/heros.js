const express = require('express');
const herosController = require('../../controllers/herosController');
const {createHeroRules} = require('../../validators/herosValidator');
const validate = require('../../validators/validate');
const {authenticateToken} = require('../../middlewares/authMiddleware');
const {uploadHeroImage} = require('../../middlewares/multerMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadHeroImage,
  createHeroRules,
  validate,
  herosController.createHero,
);
router.get('/', authenticateToken, herosController.getHeros);
router.get('/:id', authenticateToken, herosController.getHero);
router.put(
  '/:id',
  authenticateToken,
  uploadHeroImage,
  herosController.updateHero,
);
router.delete('/:id', authenticateToken, herosController.deleteHero);

module.exports = router;
