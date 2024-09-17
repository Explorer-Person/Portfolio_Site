const { body, validationResult } = require("express-validator");
const {adminQuery} = require('@queries');

const validator = [
    // Sanitize and validate info.name
    body('data.info.name')
        //.notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .isLength({ max: 100 }).withMessage('Name must be less than 100 characters')
        .escape()
        ,
    // Sanitize and validate info.surname
    body('data.info.surname')
        //.notEmpty().withMessage('Surname is required')    
        .isString().withMessage('Surname must be a string')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .isLength({ max: 100 }).withMessage('Surname must be less than 100 characters')
        .escape()
        ,
    // Sanitize and validate info.surname
    body('data.info.username')
        //.notEmpty().withMessage('Surname is required')    
        .isString().withMessage('Surname must be a string')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .isLength({ max: 100 }).withMessage('Surname must be less than 100 characters')
        .escape()
        ,
    // Sanitize and validate info.password
    body('data.info.password')
        ////.notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .escape()
        ,
    // Validate and sanitize info.bornDate
    body('data.info.bornDate')
        ////.notEmpty().withMessage('Born date is required')
        .isISO8601().withMessage('Born date must be a valid date')
        .escape()
        ,
    // Sanitize and validate info.mail
    body('data.info.email')
        ////.notEmpty().withMessage('Email is required')
        .isString()
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .isEmail().withMessage('Email must be a valid email address')
        .escape()
        ,

    // Sanitize and validate info.phone
    body('data.info.phone')
        ////.notEmpty().withMessage('Phone is required')
        .isString()
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .isMobilePhone().withMessage('Phone must be a valid mobile number')
        .escape()
        ,
    // Sanitize and validate info.location
    body('data.info.location')
        ////.notEmpty().withMessage('Location is required')
        .isString()
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })        
        .isString().withMessage('Location must be a string')
        .isLength({ max: 100 }).withMessage('Location must be less than 100 characters')
        .escape()
        ,
    // Sanitize and validate info.major
    body('data.info.major')
        ////.notEmpty().withMessage('Major is required')
        .isString().withMessage('Major must be a string')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .isLength({ max: 100 }).withMessage('Major must be less than 100 characters')
        .escape()
        ,
    // Sanitize and validate info.speciality
    body('data.info.speciality')
        .optional()
        .isString().withMessage('Speciality must be a string')
        .isLength({ max: 100 }).withMessage('Speciality must be less than 100 characters')
        .escape()
        ,
    // Sanitize and validate info.praise
    body('data.info.praise')
        .isString().withMessage('Praise must be a string')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .optional()
        .isLength({ max: 255 }).withMessage('Praise must be less than 255 characters')
        .escape()
        ,
    // Sanitize and validate info.socials
    body('data.info.socials')
        .isString().withMessage('Socials must be a string')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .optional()
        .isLength({ max: 255 }).withMessage('Socials must be less than 255 characters')
        .escape()
        ,
];

module.exports = validator;