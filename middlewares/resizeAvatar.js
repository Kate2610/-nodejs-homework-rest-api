const jimp = require('jimp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const resizeAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const image = await jimp.read(req.file.path);
    await image.cover(250, 250).writeAsync(req.file.path);

    const uniqueFileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
    const destinationPath = path.join(__dirname, '../public/avatars/', uniqueFileName);
    await image.writeAsync(destinationPath);

    req.avatarURL = `/avatars/${uniqueFileName}`;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resizeAvatar;
