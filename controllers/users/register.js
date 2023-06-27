const bcrypt = require('bcrypt');
const { usersService, emailService } = require('../../service');
const { httpError } = require('../../helpers');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    // Перевірка, чи вже зареєстрований користувач з таким емейлом і вже пройшов верифікацію
    const existingUser = await usersService.getUserByEmail(email);
    if (existingUser && existingUser.verify) {
      return res.status(400).json({ message: 'Verification has already been passed' });
    }

    // Створення або оновлення користувача з новими даними
    const userData = {
      email,
      password: hash,
      verificationToken: emailService.generateVerificationToken(),
      verify: false,
    };

    const { email: responseEmail, subscription } = await usersService.register(userData);

    // Відправка листа з посиланням для верифікації
    await emailService.sendVerificationEmail(responseEmail, userData.verificationToken);

    res.status(201).json({ user: { email: responseEmail, subscription } });
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = register;
