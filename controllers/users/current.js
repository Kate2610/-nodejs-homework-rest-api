const { httpError } = require('../../helpers');

const current = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) next(httpError(401));

    res.status(200).json({ email: user.email, subscription: user.subscription });
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = current;