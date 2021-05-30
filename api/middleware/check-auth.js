// IMPORTS
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // const rawCookies = req.headers.cookie.split('; ');
  try {
    // currently using httpOnly cookies for jwt token authorization. if you wish to use jwt tokens passed in the body comment the line below and uncommit the line below that .
    const token = req.headers.cookie.split("=")[1];
    // const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userDate = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authorization Failed",
    });
  }
};
