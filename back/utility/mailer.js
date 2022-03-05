var nodemailer = require("nodemailer");

const SendMail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    host: process.env.SMTP_SERVER,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_KEY,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_USERNAME,
    to: email,
    subject: "OTP",
    text: "Your OTP is " + code,
  };

  await transporter.sendMail(mailOptions, async function (err, info) {
    if (err) {
      console.log(err);
      return {
        error: true,
        message: "Cannot send email",
      };
    } else {
      return { error: false };
    }
  });
};

module.exports = SendMail;
