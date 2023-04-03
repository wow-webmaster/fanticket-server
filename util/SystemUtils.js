const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");

const MAIL_TITLE = {
  auth: "Verification link for your email address",
};

const transferMail = async (to, subject, message) => {
  const API_KEY = process.env.SENDIN_BLUE_SMTP_KEY;
  const config = {
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: "Ujks9b1zOYLRmEf3",
    },
  };
  try {
    const transport = nodemailer.createTransport(
      // new Transport({apiKey:API_KEY})
      ...config
    );
    const result = await transport.sendMail({
      from: subject,
      to,
      subject,
      html: message,
    });
    console.log(result);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  transferMail,
  MAIL_TITLE,
};
