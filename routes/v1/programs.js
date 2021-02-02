const express = require('express');
const programsController = require('../../controllers/programsController');
const {createProgramRules} = require('../../validators/programsValidator');
const validate = require('../../validators/validate');
const {authenticateToken} = require('../../middlewares/authMiddleware');
const {uploadProgramImage} = require('../../middlewares/multerMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  uploadProgramImage,
  createProgramRules,
  validate,
  programsController.createProgram,
);
router.get('/', authenticateToken, programsController.getPrograms);
router.get('/:id', authenticateToken, programsController.getProgram);
router.put(
  '/:id',
  authenticateToken,
  uploadProgramImage,
  programsController.updateProgram,
);
router.delete('/:id', authenticateToken, programsController.deleteProgram);
router.post(
  '/upload-image',
  authenticateToken,
  uploadProgramImage,
  programsController.uploadProgramImage,
);

module.exports = router;
