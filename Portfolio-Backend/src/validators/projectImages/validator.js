const { body, validationResult } = require("express-validator");

const validator = [
    body('data.info.url')
        .trim()
        .optional()
        .isURL().withMessage('URL must be a valid URL')
        .escape()
        ,
    body('data.fk')
        .trim()
        .isInt().withMessage('Skill ID must be an integer')
        .escape()
        ,
];

module.exports = validator;