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

  // const token = req.headers.authorization.split(" ")[1];

  const options = {
    expiresIn: "1h",
  };
  try {
    let user = await User.findOne({
      accessToken: authorizationToken,
    });

    if (!user) {
      result = {
        error: true,
        message: `Authorization error`,
      };
      return res.status(403).json(result);
    }

    result = jwt.verify(authorizationToken, process.env.JWT_SECRET, options);

    if (!user.userId === result.id) {
      result = {
        error: true,
        message: `Invalid token`,
      };

      return res.status(401).json(result);
    }

    req.decoded = result;

    next();
  } catch (err) {
    console.error(err);
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

module.exports = { validateToken };
