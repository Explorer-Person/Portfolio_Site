const { body, validationResult } = require("express-validator");

const validator = [
    body('data.info.title')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ max: 255 }).withMessage('Name must be less than 255 characters')
        .escape()
        ,
    body('data.info.level')
        .trim()
        .notEmpty().withMessage('Level is required')
        .isString().withMessage('Level must be a string')
        .isLength({ max: 255 }).withMessage('Level must be less than 255 characters')
        .escape()
        ,
    body('data.info.imgUrl')
        .trim()
        .escape()
        ,
    body('data.info.url')
        .trim()
        .notEmpty().withMessage('Url is required')
        .isString().withMessage('Url must be a string')
        .escape()
        ,
];


module.exports = validator;