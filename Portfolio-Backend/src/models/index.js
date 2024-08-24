// controllers/index.js
const skillsModel = require('./skills');
const projectsModel = require('./projects');
const projectImagesModel = require('./projectImages');
const {adminModel} = require('./admin');
const abilitiesModel = require('./abilities');

module.exports = {
    skillsModel,
    projectsModel,
    projectImagesModel,
    adminModel,
    abilitiesModel,
};

