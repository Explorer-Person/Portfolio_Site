const { body, validationResult } = require("express-validator");

const validator = [
    body('data.info.url')
        .trim()
        .isURL().withMessage('URL must be a valid URL')
        .escape()
        ,
    body('data.fk')
        .trim()
        .isInt().withMessage('Skill ID must be an integer')
        .escape()
        ,
    body('data.id')
        .optional()
        .trim()
        .isInt().withMessage('ID must be an integer')
        .escape()
        ,
];

module.exports = validator;