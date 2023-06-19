const { httpError, verifyToken } = require('../helpers');
const { getUserById } = require('../service/users-db');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(httpError(401));
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return next(httpError(401));
  }

  try {
    const payload = verifyToken(token);
    const user = await getUserById(payload._id);

    if (!user || user.token !== token) {
      return next(httpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(httpError(401));
  }
};

module.exports = auth;
