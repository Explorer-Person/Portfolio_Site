const {sendResponse} = require('@handlers')
const express = require('express');
const middleware = express(); 

middleware.use('/api/admin/authorize', function(req,res,next){
  const isAuth = req.session.isAuth;
  if(!isAuth){
    return sendResponse(res, 'Cannot Authorized', 'auth', false, 401)
  }
  sendResponse(res, 'Authorized Successfully', 'auth', true , 200);
})

module.exports = middleware; 