const { httpError } = require('../../helpers');
const { contactsService } = require('../../service');

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    if (!owner) next(httpError(401));

    const result = await contactsService.addContact({ ...req.body, owner });
    if (result) res.status(201).json(result);
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = addContact;