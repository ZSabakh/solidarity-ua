const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

async function validateToken(req, res, next) {
  const authorizationToken = req.headers.authorization;
  let result;
  if (!authorizationToken)
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });

  const options = {
    expiresIn: "1h",
  };
  try {
    result = jwt.verify(authorizationToken, process.env.JWT_SECRET, options);
    let user = await User.findById(result.id);

    if (!user) {
      result = {
        error: true,
        message: `Authorization error`,
      };
      return res.status(403).json(result);
    }

    req.user = result;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      result = {
        error: true,
        message: `TokenExpired`,
      };
    } else {
      result = {
        error: true,
        message: `Authentication error`,
      };
    }
    return res.status(403).json(result);
  }
}

async function checkAuthorization(req, res, next) {
  const authorizationToken = req.headers.authorization;
  if (authorizationToken.length > 4) {
    const options = {
      expiresIn: "1h",
    };
    try {
      result = jwt.verify(authorizationToken, process.env.JWT_SECRET, options);
      let user = await User.findById(result.id);

      if (user._id.toString() === result.id) {
        req.user = result;
      }
    } catch (err) {
      console.error(err);
    }
  }
  next();
}

module.exports = { validateToken, checkAuthorization };
