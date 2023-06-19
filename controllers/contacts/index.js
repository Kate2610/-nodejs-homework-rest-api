const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const deleteContactById = require('./deleteContactByID');
const updateContact = require('./updateContact');
const updateFavorite = require('./updateFavorite');
const checkAllowedMethods = require('./checkAllowedMethods');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContact,
  updateFavorite,
  checkAllowedMethods,
};