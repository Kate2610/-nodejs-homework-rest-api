const jwt = require('jsonwebtoken');

const createToken = _id => {
  const secret = process.env.SECRET;
  const payload = { _id };
  const token = jwt.sign(payload, secret, { expiresIn: '24h' });
  return token;
};

module.exports = createToken;