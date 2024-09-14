const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  //get token from req header
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    // get _id from user document
    req.user = await User.findOne({_id}).select("_id")
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid authorization token" });
  }
};

module.exports = requireAuth;
