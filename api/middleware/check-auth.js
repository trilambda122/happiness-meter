// IMPORTS
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const cookieObj = parseCookie(req.headers.cookie);
    console.log("TOKEN-> ", cookieObj.token);
    token = cookieObj.token
    // currently using httpOnly cookies for jwt token authorization. if you wish to use jwt tokens passed in the body comment the line below and uncommit the line below that .
    //  const token = req.headers.cookie.split("=")[1];
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

const parseCookie = (cookieStr) => {
  cookieArray = cookieStr.split(";")
  const cookieObj = cookieArray.reduce((acc,cookie)=>{
    const key = cookie.split("=");
    return {...acc,  [decodeURIComponent(key[0].trim())]:decodeURIComponent(key[1].trim())}
  },{})
 return cookieObj

};
