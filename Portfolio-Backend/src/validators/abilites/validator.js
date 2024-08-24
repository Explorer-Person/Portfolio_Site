const { body, validationResult } = require("express-validator");

const validator = [
    // Sanitize and validate info.name
    body('data.info.title')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .notEmpty().withMessage('Level is required')
        .isString().withMessage('Name must be a string')
        .isLength({ max: 100 }).withMessage('Name must be less than 100 characters')
        .escape()
        ,
         
    // Sanitize and validate info.level
    body('data.info.level')
        .customSanitizer(value => {
            return typeof value === 'string' ? value.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        })
        .notEmpty().withMessage('Level is required')
        .isString().withMessage('Level must be a string')
        .isLength({ max: 50 }).withMessage('Level must be less than 50 characters')
        .escape()
        ,

];

module.exports = validator;