const express = require('express');
const { usersControllers } = require('../../controllers');
const { auth } = require('../../middlewares');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'tmp/' });

router.post('/login', usersControllers.login);
router.post('/register', usersControllers.register);
router.post('/logout', auth, usersControllers.logout);
router.get('/current', auth, usersControllers.current);
router.patch('/', auth, usersControllers.setSubscription);

// Ендпоінт для оновлення аватарки
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  usersControllers.updateAvatar
);

// Ендпоінт для верифікації email
router.get('/verify/:verificationToken', async (req, res) => {
  const { verificationToken } = req.params;
  
  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    return res.status(200).json({ message: 'Verification successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
