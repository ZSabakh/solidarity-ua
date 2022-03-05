const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");
const { validateToken } = require("../middlewares/validate.jwt.middleware");

router.get("/submit", validateToken, PostController.submit);

module.exports = router;
