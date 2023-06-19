const { contactsService } = require('../../service');
const { httpError } = require('../../helpers');

const updateFavorite = async (req, res, next) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  try {
    if (favorite) {
      const body = { favorite };

      const data = await contactsService.updateStatusContact(contactId, body);

      if (data) res.status(200).json(data);
      else next(httpError(404));
    } else next(httpError(400, 'missing field favorite'));
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = updateFavorite;