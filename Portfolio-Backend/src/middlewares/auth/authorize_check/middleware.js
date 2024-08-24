const {sendResponse} = require('@handlers')
const express = require('express');
const middleware = express(); 

middleware.use('/api/admin/authorize', function(req,res,next){
  const isAuth = req.session.isAuth;
  if(!isAuth){
    return sendResponse(res, isAuth, 'auth', isAuth, 401)
  }
  sendResponse(res, isAuth, 'auth', isAuth , 200);
})

module.exports = middleware; 