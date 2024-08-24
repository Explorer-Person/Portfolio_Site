// controllers/index.js
const skillsQuery = require('./skills');
const projectsQuery = require('./projects');
const projectImagesQuery = require('./projectImages');
const adminQuery = require('./admin');
const abilitiesQuery = require('./abilities');

module.exports = {
    skillsQuery,
    projectsQuery,
    adminQuery,
    abilitiesQuery,
    projectImagesQuery
};
