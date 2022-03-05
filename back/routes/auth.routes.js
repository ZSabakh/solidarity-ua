const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/user.controller");
const { checkDuplicatePhone, checkDuplicateEmail } = require("../middlewares/signup.middleware");

router.post("/signup", [checkDuplicatePhone, checkDuplicateEmail], AuthController.Signup);
router.post("/login", AuthController.Login);
router.post("/activate", AuthController.Activate);
router.post("/forgot", AuthController.ForgotPassword);
router.post("/reset", AuthController.ResetPassword);

module.exports = router;
