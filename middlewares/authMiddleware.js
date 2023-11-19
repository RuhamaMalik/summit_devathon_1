const jwt = require("jsonwebtoken");
const {JSON_SECRET} = require("../config/keys");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        message: "Auth Failed: Token not provided",
        success: false,
      });
    }

    jwt.verify(token, JSON_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "Auth Failed: Invalid token",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
