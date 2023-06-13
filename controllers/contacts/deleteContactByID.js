const { contactsService } = require('../../service');
const { httpError } = require('../../helpers');

const deleteContactById = async (req, res, next) => {
  try {
    const result = await contactsService.removeContact(req.params.contactId);
    if (result > 0) res.status(200).json({ message: 'contact deleted' });
    else next(httpError(404));
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = deleteContactById;