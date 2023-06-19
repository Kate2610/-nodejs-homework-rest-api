const { httpError } = require('../../helpers');
const { getUserById, setToken } = require('../../service/users-db');

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = getUserById(_id);
    if (!user) next(httpError(401));
    setToken(_id, '');
    res.status(204).json();
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = logout;