const { validationResult } = require("express-validator");
const {sendResponse} = require('@handlers');


module.exports = (req, res, next) => {
    const errors = validationResult(req).array();
    console.log(errors)
    if (errors.length > 1) {
        // Validation failed
        return sendResponse(res, errors, 'validation', false, 400);
    }
    // Validation passed
    next();
};
