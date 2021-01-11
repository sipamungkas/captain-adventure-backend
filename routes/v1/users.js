const express = require('express');
const usersController = require('../../controllers/usersController');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/* GET users session. */
router.post('/session', usersController.getSession);

module.exports = router;
