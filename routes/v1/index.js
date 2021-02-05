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

module.exports = router;
