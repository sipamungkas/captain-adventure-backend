const express = require('express');
const contactsController = require('../../controllers/contactsController');
const {
  createContactRules,
  updateContactRules,
} = require('../../validators/contactsValidator');
const validate = require('../../validators/validate');
const {authenticateToken} = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateToken,

  createContactRules,
  validate,
  contactsController.createContact,
);
router.get('/', authenticateToken, contactsController.getContacts);
router.get('/:id', authenticateToken, contactsController.getContact);
router.put(
  '/:id',
  authenticateToken,
  updateContactRules,
  validate,
  contactsController.updateContact,
);
router.delete('/:id', authenticateToken, contactsController.deleteContact);

module.exports = router;
