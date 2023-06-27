const mongoose = require('mongoose');
const gravatar = require('gravatar');
const handleMongooseError = require('../../middlewares/handleMongooseError');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },

    avatarURL: String, // Добавлено новое поле avatarURL

      verify: {
      type: Boolean,
      default: false,
    },
      
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  
  { collection: 'users' }
);

// Генерация аватара и сохранение в поле avatarURL при сохранении пользователя
userSchema.post('save', async function (doc, next) {
  const avatarURL = gravatar.url(doc.email, { s: '200', r: 'pg', d: 'retro' });
  doc.avatarURL = avatarURL;
  await doc.save();
  next();
});

userSchema.post('findOneAndUpdate', async function (doc, next) {
  const avatarURL = gravatar.url(doc.email, { s: '200', r: 'pg', d: 'retro' });
  doc.avatarURL = avatarURL;
  await doc.save();
  next();
});

userSchema.post('findByIdAndUpdate', async function (doc, next) {
  const avatarURL = gravatar.url(doc.email, { s: '200', r: 'pg', d: 'retro' });
  doc.avatarURL = avatarURL;
  await doc.save();
  next();
});

userSchema.post('update', async function (doc, next) {
  const avatarURL = gravatar.url(doc.email, { s: '200', r: 'pg', d: 'retro' });
  doc.avatarURL = avatarURL;
  await doc.save();
  next();
});

userSchema.post('findOneAndDelete', async function (doc, next) {
  const avatarURL = gravatar.url(doc.email, { s: '200', r: 'pg', d: 'retro' });
  doc.avatarURL = avatarURL;
  await doc.save();
  next();
});

userSchema.post('findByIdAndDelete', async function (doc, next) {
  const avatarURL = gravatar.url(doc.email, { s: '200', r: 'pg', d: 'retro' });
  doc.avatarURL = avatarURL;
  await doc.save();
  next();
});

userSchema.post('deleteMany', async function (doc, next) {
  const avatarURL = gravatar.url(doc.email, { s: '200', r: 'pg', d: 'retro' });
  doc.avatarURL = avatarURL;
  await doc.save();
  next();
});

userSchema.post('findOneAndRemove', async function (doc, next) {
  const avatarURL = gravatar.url(doc.email, { s: '200', r: 'pg', d: 'retro' });
  doc.avatarURL = avatarURL;
  await doc.save();
  next();
});

// Обработка ошибок при сохранении
userSchema.post('save', handleMongooseError);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
