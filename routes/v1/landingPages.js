const express = require('express');
const landingPageController = require('../../controllers/landingPageController');
const {sendQuestionRules} = require('../../validators/questionValidator');

const router = express.Router();

router.get('/home', landingPageController.home);
router.get('/categories', landingPageController.getCategories);
router.get('/categories/:slug', landingPageController.getPacketsByCategory);
router.get('/packets/:slug', landingPageController.getPacketBySlug);
router.get('/blogs', landingPageController.getBlogs);
router.get('/blogs/:slug', landingPageController.getBlogBySlug);
router.get('/galleries', landingPageController.getGalleries);
router.get('/galleries/:id', landingPageController.getGalleryById);
router.get('/contacts', landingPageController.getContacts);
router.post(
  '/questions',
  sendQuestionRules,
  landingPageController.sendQuestion,
);
router.get('/programs', landingPageController.getPrograms);
router.get('/programs/:slug', landingPageController.getProgram);

module.exports = router;
