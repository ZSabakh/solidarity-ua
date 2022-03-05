const User = require("../models/user.model");

exports.checkDuplicatePhone = async (req, res, next) => {
  if (req.body.phone) {
    let user = await User.findOne({
      phone: req.body.phone,
    });
    if (user) {
      return res.status(400).json({
        error: true,
        message: "Phone is already in use",
      });
    }
  }
  next();
};

exports.checkDuplicateEmail = async (req, res, next) => {
  if (req.body.email) {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({
        error: true,
        message: "Email is already in use",
      });
    }
  }
  next();
};
