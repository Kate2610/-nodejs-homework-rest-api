const bcrypt = require('bcrypt');
const { usersService } = require('../../service');
const { httpError } = require('../../helpers');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);

    const { email: responseEmail, subscription } = await usersService.register({
      email,
      password: hash,
    });

    res.status(201).json({ user: { email: responseEmail, subscription } });
  } catch (e) {
    next(httpError(500, e.massage));
  }
};

module.exports = register;