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

// Эндпоинт для обновления аватарки
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  usersControllers.updateAvatar
);

module.exports = router;
