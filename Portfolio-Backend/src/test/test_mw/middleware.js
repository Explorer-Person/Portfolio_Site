module.exports = (req,res,next) =>{
    
    console.log('I got request body: ', req.body.data);
    console.log('I got request file: ', req.file ? req.file : null);
    return next();
}