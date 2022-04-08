const Resource = require("../models/resource.model");

exports.fetchResources = async (req, res, next) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json({ resources });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};
