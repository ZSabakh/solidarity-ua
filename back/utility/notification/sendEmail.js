var AWS = require("aws-sdk");

module.exports = function SendEmail(otp, recipient) {
  AWS.config.update({ region: "us-east-1" });

  var params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>Your verification code is - ${otp}</h1>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Solidatity UA",
      },
    },
    Source: process.env.EMAIL_SENDER,
  };

  var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();

  return sendPromise;
};
