// IMPORTS
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
try{
    console.log("REQ--->",req.params.userId)
    const userId = req.params.userId
    const cookieObj = parseCookie(req.headers.cookie);
    token = cookieObj.token
    const decoded = jwt.decode(token);
    const tokenUserId = decoded.userId
   
    if (userId === tokenUserId){
        next()
    }else {
        return res.status(401).json({
            message: "Authorization Failed User Tokens Do Not Match",
        });
    }
   
}catch (error){
    console.log(error)
    return res.status(401).json({
        message: "Authorization Failed Checking User from Token",
    });
}

}


const parseCookie = (cookieStr) => {
    cookieArray = cookieStr.split(";")
    const cookieObj = cookieArray.reduce((acc,cookie)=>{
      const key = cookie.split("=");
      return {...acc,  [decodeURIComponent(key[0].trim())]:decodeURIComponent(key[1].trim())}
    },{})
   return cookieObj
  
  };
  
