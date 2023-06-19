const { isValidObjectId } = require('mongoose');
const { httpError } = require('../helpers');

const checkId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) next(httpError(400, 'Invalid contactId'));
  else next();
};

module.exports = checkId;