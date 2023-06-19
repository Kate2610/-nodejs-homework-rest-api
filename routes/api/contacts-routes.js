const express = require('express');

const { contactsControllers } = require('../../controllers');
const {
  schemaInsert,
  schemaUpdateFavorite,
  schemaUpdate,
} = require('../../schemas/contactsSchema');
const { validateBody } = require('../../decorators');
const { checkId, auth } = require('../../middlewares');

const router = express.Router();

router.all('*', contactsControllers.checkAllowedMethods);

router.use(auth);

router.get('/', contactsControllers.getAllContacts);

router.get('/:contactId', checkId, contactsControllers.getContactById);

router.post('/', validateBody(schemaInsert), contactsControllers.addContact);

router.delete('/:contactId', checkId, contactsControllers.deleteContactById);

router.put('/:contactId', validateBody(schemaUpdate), checkId, contactsControllers.updateContact);

router.patch(
  '/:contactId/favorite',
  validateBody(schemaUpdateFavorite),
  checkId,
  contactsControllers.updateFavorite
);

module.exports = router;