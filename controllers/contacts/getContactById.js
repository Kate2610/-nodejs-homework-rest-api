const { contactsService } = require('../../service');
const { httpError } = require('../../helpers');

const getContactById = async (req, res, next) => {
  try {
    const data = await contactsService.getContactById(req.params.contactId);

    if (data) res.status(200).json(data);
    else next(httpError(404));
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = getContactById;