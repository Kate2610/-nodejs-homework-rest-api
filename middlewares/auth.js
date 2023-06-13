const { httpError, verifyToken } = require('../helpers');
const { getUserById } = require('../service/users-db');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  const [method, token] = authorization.split(' ');

  if (method !== 'Bearer') {
    next(httpError(401));
  }

  try {
    const payload = verifyToken(token);
    const user = await getUserById(payload._id);
    if (!user || user.token !== token) {
      next(httpError(401));
    }

    req.user = user;
   
    next();
  } catch (error) {
    console.log(error);
    next(httpError(401));
  }
};

module.exports = auth;