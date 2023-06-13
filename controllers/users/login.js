const bcrypt = require('bcrypt');

const { usersService } = require('../../service');
const { httpError, createToken } = require('../../helpers');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.getUserByEmail(email);

    if (!user) return next(httpError(401, 'Email or password is wrong'));

    const result = await bcrypt.compare(password, user.password);

    if (!result) return next(httpError(401, 'Email or password is wrong'));

    const { subscription, _id } = user;
    const token = createToken(_id);
    await usersService.setToken(_id, token);

    res.status(200).json({ token: token, user: { email, subscription } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = login;