const User = require('../../controllers/users');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Функція для відправки листа з посиланням для верифікації
const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: 'yekaterina.anisimova@gmail.com', 
    subject: 'Email Verification',
    text: `Click on the link to verify your email: /users/verify/${verificationToken}`,
    html: `<p>Click on the link to verify your email: <a href="/users/verify/${verificationToken}">Verify Email</a></p>`,
  };

  await sgMail.send(msg);
};



module.exports = sendVerificationEmail;

