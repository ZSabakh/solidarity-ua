const Post = require("../models/post.model");
const City = require("../models/city.model");
const HelpType = require("../models/help.types.model");
const User = require("../models/user.model");
const getCoordinates = require("../utility/getCoordinates");
const { FetchMapaHelp } = require("../utility/fetchMapaHelp");

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
    if (req.body.location) {
      try {
        let coordinates = await getCoordinates(req.body.location.place_id);

        commonPostInfo.location.lat =
          coordinates.data.result.geometry.location.lat;
        commonPostInfo.location.lng =
          coordinates.data.result.geometry.location.lng;
      } catch (err) {
        console.log("Could not get coordinates ", err);
      }
    }
    let accomodation, transportation, other;
    let postsToSave = [];

    for (let type of types) {
      let helpType = await HelpType.findById(type);
      if (!helpType) throw new Error("Invalid type");
      if (helpType.name === "Accomodation") {
        accomodation = req.body.accomodation;
        postsToSave.push(
          new Post({ type: helpType._id, ...commonPostInfo, accomodation })
        );
      }
      if (helpType.name === "Transportation") {
        transportation = req.body.transportation;
        postsToSave.push(
          new Post({ type: helpType._id, ...commonPostInfo, transportation })
        );
      }
      if (helpType.name === "Other") {
        postsToSave.push(new Post({ type: helpType._id, ...commonPostInfo }));
      }
    }

    for (let i = 0; i < postsToSave.length; i++) {
      let post = await postsToSave[i].save();
      if (!post) throw new Error("Error while saving post");
    }

    res.status(200).json({
      success: true,
      message: "Post submitted successfully",
      post: postsToSave[0],
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).send({ error: true, message: err.message });
    }
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

exports.deactivate = async (req, res) => {
  try {
    let { post_id } = req.body;
    let post = await Post.findById(post_id);

    if (!post || !post.active) throw new Error("Invalid post");
    if (post.author.toString() !== req.user.id)
      throw new Error("You are not authorized to deactivate this post");

    post.active = false;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post deactivated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let amountOnPage = 10;
    let searchCondition = { active: true };
    let HelpTypes = await HelpType.find({});

    if (req.query.city && req.query.city !== "all") {
      searchCondition.city = req.query.city;
    }

    let { Accomodation, Transportation, Other } = req.query;

    let types = [];
    if (Accomodation === "true")
      types.push(HelpTypes.find((type) => type.name === "Accomodation")._id);
    if (Transportation === "true")
      types.push(HelpTypes.find((type) => type.name === "Transportation")._id);
    if (Other === "true")
      types.push(HelpTypes.find((type) => type.name === "Other")._id);

    searchCondition.type = { $in: types };

    let posts = await Post.find(searchCondition)
      .select("-contact")
      .sort({ _id: -1 })
      .skip((page - 1) * amountOnPage)
      .limit(amountOnPage)
      .populate(["type", "city"])
      .populate("author", "name");

    //Integration with MapaHelpmap
    let MapaHelpPosts = await FetchMapaHelp();

    if (searchCondition.city) {
      MapaHelpPosts = MapaHelpPosts.filter((post) => {
        return post.city._id?.toString() === searchCondition.city;
      });
    }

    MapaHelpPosts = MapaHelpPosts.filter((post) => {
      return types.some((type) => type.toString() === post.type._id.toString());
    });

    let totalPosts = await Post.countDocuments({});
    totalPosts += MapaHelpPosts.length;

    //Paginating MapaHelpPosts
    MapaHelpPosts = MapaHelpPosts.slice(
      (page - 1) * (amountOnPage - posts.length),
      page * (amountOnPage - posts.length)
    );

    let totalPages = Math.ceil(totalPosts / amountOnPage);

    res.status(200).json({
      success: true,
      posts: [...posts, ...MapaHelpPosts],
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

exports.getPost = async (req, res) => {
  let postId = req.params.id;
  try {
    let post;
    if (postId.includes("mapa")) {
      let MapaHelpPosts = await FetchMapaHelp();
      post = MapaHelpPosts.find((post) => post._id === postId);
      if (!post) throw new Error("Invalid post");
      return res.status(200).send({
        success: true,
        post,
      });
    } else {
      post = await Post.findById(postId)
        .populate(["type", "city"])
        .populate("author", "name")
        .exec();
    }
    if (!post || !post.active) throw new Error("Invalid post");
    if (!req.user) {
      for (let key in post.contact) {
        if (post.contact[key] && typeof post.contact[key] === 'object' && !post.contact[key].public) {
          post.contact[key].value = "";
        }
      }
    }
    res.status(200).json({
      success: true,
      post: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

exports.getOnlyOwnPosts = async (req, res) => {
  try {
    let posts = await Post.find({ author: req.user.id, active: true })
      .sort({ _id: -1 })
      .populate(["type", "city"])
      .populate("author", "name");

    return res.status(200).json({
      success: true,
      posts: posts,
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
