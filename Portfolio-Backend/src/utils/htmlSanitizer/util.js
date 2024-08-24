const escapeHTML = require('escape-html');

async function htmlSanitizer(response){
    const data = await response;
    const fieldsToSanitize = Object.keys(data);
    console.log(fieldsToSanitize);
    const sanitizedData = {...data};
    // Loop through the fields and sanitize each one
    for (const field of fieldsToSanitize) {
        if (sanitizedData[field]) {
            sanitizedData[field] = escapeHTML(sanitizedData[field]);
        }
    }
    return sanitizedData;

}

module.exports = htmlSanitizer;