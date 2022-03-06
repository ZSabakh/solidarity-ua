const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");
const { validateToken } = require("../middlewares/validate.jwt.middleware");

router.post("/submit", validateToken, PostController.submit);
router.get("/options", PostController.fetchOptions);

module.exports = router;
