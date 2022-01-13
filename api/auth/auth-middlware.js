const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const Collections = require("../collections/collections-model");

function tokenRestricted(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: "token required" });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return next({ status: 401, message: "token invalid" });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
  }
}

function checkUsernamePasswordSent(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 422, message: "username and password are requried" });
  } else {
    next();
  }
}

async function checkUsernameFree(req, res, next) {
  const { username } = req.body;
  const user = await Collections.findBy({ username });
  if (user.length) {
    next({ status: 422, message: "username taken" });
  } else {
    next();
  }
}

module.exports = {
  tokenRestricted,
  checkUsernamePasswordSent,
  checkUsernameFree,
};
