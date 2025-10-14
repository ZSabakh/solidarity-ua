module.exports = async function SendSMS(content, recipient) {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  return client.messages.create({
    body: content,
    messagingServiceSid: process.env.TWILIO_SERVICE,
    to: recipient,
  });
};
