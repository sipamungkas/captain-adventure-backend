const express = require('express');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const packetsRouter = require('./packets');
const herosRouter = require('./heros');
const blogPostrouter = require('./blogs');
const programsRouter = require('./programs');

const router = express.Router();

/* Users resources. */
router.use('/users', usersRouter);
// Categories reources.
router.use('/categories', categoriesRouter);
// Packets resources
router.use('/packets', packetsRouter);
// Heros resources
router.use('/hero', herosRouter);
// Blog post resources
router.use('/posts', blogPostrouter);
// Programs resources
router.use('/programs', programsRouter);

module.exports = router;
