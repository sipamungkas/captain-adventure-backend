const nodemailer = require('nodemailer');

const BASE_URL = process.env.FRONTEND_BASEURL;
const SERVICE = process.env.SMTP_SERVICE;
const USERNAME = process.env.SMTP_USERNAME;
const PASSWORD = process.env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: USERNAME,
    pass: PASSWORD,
  },
});
// async..await is not allowed in global scope, must use a wrapper
const sendResetLink = async (to, recipient, token) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"no-reply" <no-reply@sipamungkas.com>', // sender address
      to, // list of receivers
      subject: 'Password Reset Link', // Subject line
      text: `
      Please click this link to reset your password!
      ${BASE_URL}users/reset-pasword?token=${token}
      The link will expired in 3 hours
      `, // plain text body
      html: `
        <!DOCTYPE html>
        <html>

        <head>
            <title>Forgot Password Link</title>
        </head>

        <body>
            <div>
                <h3>Dear ${recipient},</h3>
                <p>You requested for a password reset, kindly use this <a href="${BASE_URL}users/reset-pasword?token=${token}">link</a> to reset your password</p>
                <p>The link will expired in 3 hours</p>
                <br>
                <p>Cheers!</p>
            </div>
        
        </body>

        </html>
        Copy this link to your addres if you can't click the link
        ${BASE_URL}users/reset-pasword?token=${token}
      `, // html body
    });
    return info.messageId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const sendQuestionNotification = async (name, email, body) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"no-reply" <no-reply@sipamungkas.com>', // sender address
      to: process.env.EMAILADMIN, // list of receivers
      subject: 'Pertanyaan Baru di Captain Adventure', // Subject line
      text: `
      `, // plain text body
      html: `
        <!DOCTYPE html>
        <html>

        <head>
            <title>Anda mendapatkan pertanyaan baru!</title>
        </head>

        <body>
            <div>
                <h3>Dear Admin,</h3>
                <p>Anda mendapatkan pertanyaan dari ${name}</p>
                <p>Email penanya: ${email}</p>
                <p>${body}</p>
                <br>
                <p>Silakan buka dashboard Captain Adventure untuk menanggapi pertanyaan user!</p>
            </div>
        
        </body>

        </html>
        Silakan buka dashboard captain adventure apabila anda tidak dapat membaca email diatas!
      `, // html body
    });
    return info.messageId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {sendResetLink, sendQuestionNotification};
