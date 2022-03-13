const AWS = require("aws-sdk");

module.exports = async function SendSMS(otp, phone) {
  AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
  });

  AWS.config.update({ region: "us-east-1" });

  var params = {
    Message: `Your verification code is - ${otp}`,
    PhoneNumber: phone,
  };

  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" }).publish(params).promise();

  return publishTextPromise;
};
