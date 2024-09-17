const { body, validationResult } = require("express-validator");

const validator = [
    body('data.info.title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ max: 255 }).withMessage('Title must be less than 255 characters')
        .escape()
        ,
    body('data.info.kinds')
        .trim()
        //.notEmpty().withMessage('Kinds is required')
        .isString().withMessage('Kinds must be a string')
        .isLength({ max: 255 }).withMessage('Kinds must be less than 255 characters')
        .escape()
        ,
    body('data.info.detail')
        .trim()
        //.notEmpty().withMessage('Detail is required')
        .isString().withMessage('Detail must be a string')
        .escape()
        ,
    body('data.info.url')
        .trim()
        //.notEmpty().withMessage('URL is required')
        .isURL().withMessage('URL must be a valid URL')
        .escape()
        ,
    body('data.info.imgUrl')
        .trim()
        //.isURL().withMessage('Media URL must be a valid URL')
        .escape()
        ,
    body('data.info.videoUrl')
        .trim()
        //.isURL().withMessage('Media URL must be a valid URL')
        .escape()
        ,
    body('data.fk')
        .trim()
        .notEmpty().withMessage('Skill ID is required')
        .isInt().withMessage('Skill ID must be an integer')
        .escape()
        ,
];

module.exports = validator;