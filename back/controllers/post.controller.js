const Post = require("../models/post.model");
const City = require("../models/city.model");
const HelpType = require("../models/help.types.model");

exports.submit = async (req, res) => {
  try {
    let types = req.body.type;
    if (types.length === 0) throw new Error("Invalid help type");
    let commonPostInfo = {
      author: req.user.id,
      title: req.body.title,
      description: req.body.description,
      city: req.body.city,
      contact: req.body.contact,
      location: req.body.location,
    };

    let accomodation, transportation, other;
    let postsToSave = [];

    for (let type of types) {
      let helpType = await HelpType.findById(type);
      if (!helpType) throw new Error("Invalid type");
      if (helpType.name === "Accomodation") {
        accomodation = req.body.accomodation;
        postsToSave.push(new Post({ type: helpType._id, ...commonPostInfo, accomodation }));
      }
      if (helpType.name === "Transportation") {
        transportation = req.body.transportation;
        postsToSave.push(new Post({ type: helpType._id, ...commonPostInfo, transportation }));
      }
      if (helpType.name === "Other") {
        postsToSave.push(new Post({ type: helpType._id, ...commonPostInfo }));
      }
    }

    for (let i = 0; i < postsToSave.length; i++) {
      let post = await postsToSave[i].save();
      if (!post) throw new Error("Error while saving post");
    }

    return res.status(200).json({
      success: true,
      message: "Post submitted successfully",
      post: postsToSave[0],
    });
  } catch (err) {
    console.error(err);
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

exports.getAll = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let amountOnPage = 20;
    //Return all posts with pagination and return amount of total pages.
    let posts = await Post.find({})
      .skip((page - 1) * amountOnPage)
      .limit(amountOnPage)
      .populate(["author", "type", "city"]);

    let totalPosts = await Post.countDocuments({});
    let totalPages = Math.ceil(totalPosts / amountOnPage);

    res.status(200).json({
      success: true,
      posts: posts,
      totalPages: totalPages,
    });
  } catch (err) {
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
