const { contactsService } = require('../../service/');
const { httpError } = require('../../helpers');

const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      const result = await contactsService.updateContact(req.params.contactId, req.body);
      if (result) res.status(200).json(result);
      else next(httpError(404));
    } else next(httpError(400, 'missing fields'));
  } catch (e) {
    next(httpError(400, e.message));
  }
};

module.exports = updateContact;