const { httpError } = require('../../helpers');
const { contactsService } = require('../../service');

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner = null } = req.user;
    if (!owner) next(httpError(401));
    const { limit, page, ...query } = req.query;

    const data = await contactsService.getContacts({ limit, page, owner, query });
    res.status(200).json(data);
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = getAllContacts;