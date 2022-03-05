const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
  expiresIn: "1h",
};

async function generateJwt(phone, userId) {
  try {
    const payload = { phone: phone, id: userId };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token: token };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

module.exports = { generateJwt };
