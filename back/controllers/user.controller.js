const Joi = require("joi");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateJwt } = require("../utility/generateJwt");
const SendSMS = require("../utility/notification/sendSMS");
const SendEmail = require("../utility/notification/sendEmail");
const randomize = require("randomatic");

exports.Signup = async (req, res) => {
  try {
    if (req.body.email && req.body.phone) throw new Error("Cannot signup with both email and phone");

    const hash = await User.hashPassword(req.body.password);
    req.body.password = hash;

    // req.body.otpToken = randomize("0", 4);
    // req.body.otpTokenExpires = new Date(Date.now() + 60 * 1000 * 15); //15 minutes

    // if (req.body.phone) {
    //   await SendSMS(`Your verification code is - ${req.body.otpToken}`, req.body.phone).catch((err) => {
    //     throw new Error("Couldn't send SMS, try authorizing using email");
    //   });
    // }
    // if (req.body.email) {
    //   await SendEmail(`Your verification code is - ${req.body.otpToken}`, req.body.email, "Verification Code").catch((err) => {
    //     throw new Error("Couldn't send email, try authorizing using phone");
    //   });
    // }

    const newUser = new User(req.body);
    const { error, token } = await generateJwt(newUser.name, newUser._id);
    if (error) throw new Error("Couldn't create access token. Please try again later");
    newUser.accessToken = token;

    await newUser.save();

    res.status(200).send({
      success: true,
      message: "Registration Success",
      // codeExpiration: newUser.otpTokenExpires,
      accessToken: token,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ error: true, message: err.message });
      return;
    }
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if ((!phone && !email) || !password) throw new Error("Please make a valid request");

    const user = await User.findOne({ email: email, phone: phone });
    if (!user) throw new Error("User not found");

    if (!user.active) throw new Error("You must verify your account. Use activation page");

    const isValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    const { error, token } = await generateJwt(user.name, user._id);
    if (error) throw new Error("Couldn't create access token. Please try again later");

    user.accessToken = token;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

exports.SendOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!phone && !email) throw new Error("Please make a valid request");

    const user = await User.findOne({ email: email, phone: phone });
    if (!user) throw new Error("Account not found");

    if (user.active) throw new Error("Account already activated");

    user.otpToken = randomize("0", 4);
    user.otpTokenExpires = new Date(Date.now() + 60 * 1000 * 15); //15 minutes
    await user.save();
    if (user.phone) {
      await SendSMS(user.otpToken, user.phone).catch((err) => {
        throw new Error("Couldn't send SMS, try authorizing using email");
      });
    }
    if (user.email) {
      await SendEmail(`Your verification code is - ${user.otpToken}`, req.body.email, "Verification Code").catch((err) => {
        throw new Error("Couldn't send email, try authorizing using phone");
      });
    }
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      codeExpiration: user.otpTokenExpires,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message,
    });
  }
};

exports.Activate = async (req, res) => {
  try {
    const { email, phone, code } = req.body;
    if ((!phone && !email) || !code) throw new Error("Please make a valid request");

    const user = await User.findOne({
      email: email,
      phone: phone,
      otpToken: code,
      otpTokenExpires: { $gt: Date.now() },
    });

    if (!user) throw new Error("Invalid details");

    if (user.active) throw new Error("Account already activated");

    user.otpToken = "";
    user.otpTokenExpires = null;
    user.active = true;
    const { error, token } = await generateJwt(user.name, user._id);

    if (error) throw new Error("Couldn't create access token. Please try again later");

    user.accessToken = token;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Account activated.",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone) throw new Error("Cannot be processed");

    const user = await User.findOne({
      email: email,
      phone: phone,
    });

    if (!user) throw new Error("Account not found");

    let code = randomize("Aa0", 60);
    let expiry = Date.now() + 60 * 1000 * 15;
    user.resetPasswordToken = code;
    user.resetPasswordExpires = expiry;

    if (user.email) {
      await SendEmail(`Follow the link to reset your password - <a clicktracking="off" href="https://uaunity.com/password/reset/${code}">Reset password</a>`, user.email, "Reset Password").catch((_) => {
        throw new Error("Couldn't send email, try authorizing using phone");
      });
    }
    if (user.phone) {
      await SendSMS(`Follow the link to reset your password - https://uaunity.com/password/reset/${code}`, user.phone).catch((_) => {
        throw new Error("Couldn't send SMS, try authorizing using email");
      });
    }

    await user.save();
    res.status(200).send({
      success: true,
      message: "Sent notification to reset your password",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) throw new Error("Provide token and a new password");

    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Password reset token is invalid or expired.");

    const hash = await User.hashPassword(req.body.newPassword);
    user.password = hash;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = "";
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password has been changed",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.GetProfileData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otpToken -otpTokenExpires -resetPasswordToken -resetPasswordExpires -accessToken");
    if (!user) throw new Error("Could not find user");

    res.status(200).send({
      success: true,
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
