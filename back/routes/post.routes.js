const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");
const { validateToken, checkAuthorization } = require("../middlewares/validate.jwt.middleware");

router.post("/submit", validateToken, PostController.submit);
router.post("/deactivate", validateToken, PostController.deactivate);
router.get("/get_all", PostController.getAll);
router.get("/get/:id", checkAuthorization, PostController.getPost);
router.get("/options", PostController.fetchOptions);
router.get("/by-me", validateToken, PostController.getOnlyOwnPosts);

module.exports = router;
