const Post = require("../models/post.model");

exports.submit = async (req, res) => {
  try {
    const post = await new Post(req.body.post).save();
    return res.status(200).json({
      success: true,
      message: "Post submitted successfully",
      post: post,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ error: true, message: err.message });
      return;
    }
    res.status(500).json({
      error: true,
      message: e.message,
    });
  }
};
