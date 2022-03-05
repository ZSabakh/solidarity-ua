const Joi = require("joi");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateJwt } = require("../utility/generateJwt");

exports.Signup = async (req, res) => {
  try {
    const hash = await User.hashPassword(req.body.password);
    req.body.password = hash;

    //Handle email SMS or Email OTP.
    if (req.body.phone) {
    }
    if (req.body.email) {
    }

    req.body.otpToken = "0000"; //Will need to generate and send out as either email or SMS.
    req.body.otpTokenExpires = new Date(Date.now() + 60 * 1000 * 15); //15 minutes

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Registration Success",
      codeExpiration: newUser.otpTokenExpires,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ error: true, message: err.message });
      return;
    }
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if ((!phone && !email) || !password) {
      return res.status(400).json({
        error: true,
        message: "Cannot authorize user.",
      });
    }
    const user = await User.findOne({ email: email, phone: phone });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found",
      });
    }

    if (!user.active) {
      return res.status(400).json({
        error: true,
        message: "You must verify your phone to activate your account",
      });
    }

    const isValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isValid) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
        accessToken: token,
      });
    }

    const { error, token } = await generateJwt(user.name, user._id);
    if (error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't create access token. Please try again later",
      });
    }
    user.accessToken = token;

    await user.save();

    return res.send({
      success: true,
      message: "User logged in successfully",
      accessToken: token,
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
};

exports.Activate = async (req, res) => {
  try {
    const { email, phone, code } = req.body;
    if ((!phone && !email) || !code) {
      return res.status(400).json({
        error: true,
        message: "Please make a valid request",
      });
    }
    const user = await User.findOne({
      email: email,
      phone: phone,
      otpToken: code,
      otpTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid details",
      });
    } else {
      if (user.active)
        return res.send({
          error: true,
          message: "Account already activated",
          status: 400,
        });
      user.otpToken = "";
      user.otpTokenExpires = null;
      user.active = true;
      const { error, token } = await generateJwt(user.name, user._id);
      if (error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't create access token. Please try again later",
        });
      }
      user.accessToken = token;

      await user.save();
      return res.status(200).json({
        success: true,
        message: "Account activated.",
        accessToken: token,
      });
    }
  } catch (error) {
    console.error("activation-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone) {
      return res.send({
        status: 400,
        error: true,
        message: "Cannot be processed",
      });
    }
    const user = await User.findOne({
      email: email,
      phone: phone,
    });
    if (!user) {
      return res.send({
        error: true,
        message: "Error. Please try again later",
      });
    }
    //Either send email or SMS.
    let code = "0000";
    //CODE SHOULD BE ABSOLUTELY UNIQUE ON PROD!!!

    let expiry = Date.now() + 60 * 1000 * 15;
    user.resetPasswordToken = code;
    user.resetPasswordExpires = expiry;
    await user.save();
    return res.send({
      success: true,
      message: "Sent notification to reset your password",
    });
  } catch (error) {
    console.error("forgot-password-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(403).json({
        error: true,
        message: "Provide token and a new password",
      });
    }
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.send({
        error: true,
        message: "Password reset token is invalid.",
      });
    }

    const hash = await User.hashPassword(req.body.newPassword);
    user.password = hash;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = "";
    await user.save();
    return res.send({
      success: true,
      message: "Password has been changed",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
