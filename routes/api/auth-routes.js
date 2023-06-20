const express = require('express');
const path = require('path');
const fs = require('fs');
const jimp = require('jimp');

const { usersControllers } = require('../../controllers');
const { validateBody, checkUserEmail } = require('../../decorators');
const { usersSchema } = require('../../schemas');
const { auth, upload } = require('../../middlewares');

const router = express.Router();

router.post('/login', validateBody(usersSchema.registerSchema), usersControllers.login);

router.post(
  '/register',
  validateBody(usersSchema.registerSchema),
  checkUserEmail(),
  usersControllers.register
);

router.post('/logout', auth, usersControllers.logout);

router.get('/current', auth, usersControllers.current);

router.patch(
  '/',
  auth,
  validateBody(usersSchema.subscriptionSchema),
  usersControllers.setSubscription
);

router.patch('/avatars', auth, upload.single('avatar'), async (req, res, next) => {
  try {
    const avatarPath = req.file.path;
    const tmpFolderPath = path.join(__dirname, '../../../tmp');
    
    fs.renameSync(avatarPath, path.join(tmpFolderPath, req.file.filename));
    const savedAvatarPath = path.join(tmpFolderPath, req.file.filename);
    
    const avatar = await jimp.read(savedAvatarPath);
    await avatar.cover(250, 250).writeAsync(savedAvatarPath);
    
    const avatarsFolderPath = path.join(__dirname, '../../../public/avatars');
    const uniqueFileName = req.user._id + '_' + Date.now() + path.extname(savedAvatarPath);
    const newAvatarPath = path.join(avatarsFolderPath, uniqueFileName);
    
    fs.renameSync(savedAvatarPath, newAvatarPath);
    
    const avatarURL = '/avatars/' + uniqueFileName;
    req.user.avatarURL = avatarURL;
    await req.user.save();
    
    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
