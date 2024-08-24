const { body, validationResult } = require("express-validator");
const {adminQuery} = require('@queries');

const validator = [
    
    // Sanitize and validate data.info.password
    body('password')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .escape()
        ,
    // Sanitize and validate data.info.mail
    body('email')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })        
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a valid email address')
        .custom(async (value, res) =>{
           const admin = new adminQuery();
           const isThere = await admin.getAll();
           if(isThere){
             throw new Error('Admin section already occupied from someone...')
           }
        })
        .escape()
        ,
];

module.exports = validator;