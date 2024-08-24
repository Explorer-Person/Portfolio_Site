const abilitiesValidator = require('./abilites')
const adminValidator = require('./admin')
const projectsValidator = require('./projects')
const skillsValidator = require('./skills')
const loginValidator = require('./login')
const signupValidator = require('./signup')
const projectImagesValidator = require('./projectImages')
const validationResult = require('./output')

module.exports = { projectImagesValidator, loginValidator, signupValidator, abilitiesValidator, adminValidator, projectsValidator, skillsValidator, validationResult }