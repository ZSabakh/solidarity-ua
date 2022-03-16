const sgMail = require("@sendgrid/mail");

module.exports = function SendEmail(content, recipient, subject) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: recipient,
    from: "no-reply@uaunity.com",
    subject: `UA Unity - ${subject}`,
    text: "UA Unity notification",
    html: `<h1>${content}</h1>`,
  };
  return sgMail.send(msg);
};
