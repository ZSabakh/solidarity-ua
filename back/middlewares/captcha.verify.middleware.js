const axios = require("axios");

exports.verifyCaptcha = async (req, res, next) => {
  try {
    const secret = process.env.CAPTCHA_SECRET;
    const { captcha } = req.body;
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha}`);
    if (!response.data.success) {
      return res.status(400).json({
        error: true,
        message: "Failed captcha verification",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};
