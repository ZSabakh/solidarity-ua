const Post = require("../models/post.model");
const City = require("../models/city.model");
const HelpType = require("../models/help.types.model");

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
      message: err.message,
    });
  }
};

exports.fetchOptions = async (req, res) => {
  try {
    let cities = await City.find({});
    let helpTypes = await HelpType.find({});

    if (!cities || !helpTypes) throw new Error("Cannot fetch options");

    res.status(200).json({
      success: true,
      cities: cities,
      helpTypes: helpTypes,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};
