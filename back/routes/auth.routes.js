const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/user.controller");
const { checkDuplicatePhone, checkDuplicateEmail } = require("../middlewares/signup.middleware");
const { verifyCaptcha } = require("../middlewares/captcha.verify.middleware");
const RateLimit = require("../middlewares/rate.limit.middleware");
const { validateToken } = require("../middlewares/validate.jwt.middleware");

router.use(RateLimit);
router.post("/signup", [checkDuplicatePhone, checkDuplicateEmail, verifyCaptcha], AuthController.Signup);
router.post("/login", [verifyCaptcha], AuthController.Login);
router.post("/send-otp", [verifyCaptcha], AuthController.SendOTP);
router.post("/activate", [verifyCaptcha], AuthController.Activate);
router.post("/forgot", [verifyCaptcha], AuthController.ForgotPassword);
router.post("/reset", [verifyCaptcha], AuthController.ResetPassword);
router.get("/profile", validateToken, AuthController.GetProfileData);

module.exports = router;
