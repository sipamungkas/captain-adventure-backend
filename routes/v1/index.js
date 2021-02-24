const express = require('express');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const packetsRouter = require('./packets');
const herosRouter = require('./heros');
const blogPostrouter = require('./blogs');
const programsRouter = require('./programs');
const testimonialsRouter = require('./testimonials');
const galleriesRouter = require('./galleries');
const contactsRouter = require('./contacts');
const questionsRouter = require('./questions');
const landingPageRouter = require('./landingPages');
const brochuresRouter = require('./brochures');
const captchaRouter = require('./captcha');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/packets', packetsRouter);
router.use('/hero', herosRouter);
router.use('/posts', blogPostrouter);
router.use('/programs', programsRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/galleries', galleriesRouter);
router.use('/contacts', contactsRouter);
router.use('/questions', questionsRouter);
router.use('/landing-page', landingPageRouter);
router.use('/brochures', brochuresRouter);
router.use('/captcha', captchaRouter);

module.exports = router;
