const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  console.log("userToken", req.cookies.userToken);
  jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      req.user = payload;
      console.log("authenticated");
      next();
    }
  });
};

module.exports = authenticate;
