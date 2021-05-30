// IMPORTS
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {  
// const rawCookies = req.headers.cookie.split('; ');
// console.log('I LOVE RAS COOKIES',rawCookies)
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userDate = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authorization Failed',
    });
  }
};
