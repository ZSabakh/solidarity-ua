const sgMail = require("@sendgrid/mail");

module.exports = function SendEmail(otp, recipient) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: recipient,
    from: "no-reply@uaunity.com",
    subject: "UA Unity - Verification Code",
    text: "OTP Code",
    html: `<h1>Your verification code is - ${otp}</h1>`,
  };
  return sgMail.send(msg);
};
