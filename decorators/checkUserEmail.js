const { httpError } = require('../helpers');
const { usersService } = require('../service');

const checkUserEmail = () => {
  const func = (req, res, next) => {
    const { email } = req.body;

    if (email) {
      usersService
        .getUserByEmail(email)
        .then(user => {
          if (user) next(httpError(409, 'Email in use'));
          else next();
        })
        .catch(e => next(httpError(500, e.message)));
    } else next();
  };

  return func;
};

module.exports = checkUserEmail;