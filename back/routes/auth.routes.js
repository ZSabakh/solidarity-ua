const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/user.controller");
const { checkDuplicatePhone, checkDuplicateEmail } = require("../middlewares/signup.middleware");
const { verifyCaptcha } = require("../middlewares/captcha.verify.middleware");

router.post("/signup", [checkDuplicatePhone, checkDuplicateEmail, verifyCaptcha], AuthController.Signup);
router.post("/login", [verifyCaptcha], AuthController.Login);
router.post("/activate", [verifyCaptcha], AuthController.Activate);
router.post("/forgot", [verifyCaptcha], AuthController.ForgotPassword);
router.post("/reset", [verifyCaptcha], AuthController.ResetPassword);

module.exports = router;
