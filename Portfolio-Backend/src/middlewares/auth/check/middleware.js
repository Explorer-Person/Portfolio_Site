const {sendResponse} = require('@handlers')
 
module.exports = function(req,res,next){
  const isAuth = req.session.isAuth;
  if(!isAuth){
    return sendResponse(res, isAuth, 'Not Authorized...' , isAuth.isAuth, 401)
  }
  next();
}