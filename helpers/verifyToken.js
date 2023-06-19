const jwt = require('jsonwebtoken');

const verifyToken = token => {
  const secret = process.env.SECRET;
  try {
    const verify = jwt.verify(token, secret);

    return verify;
  } catch (error) {
    error.status = 401;
    throw error;
  }
};

module.exports = verifyToken;