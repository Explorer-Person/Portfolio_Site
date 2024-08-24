const abilitiesRoutes = require('./abilities');
const skillsRoutes = require('./skills');
const projectsRoutes = require('./projects');
const projectImagesRoutes = require('./projectImages');
const adminRoutes = require('./admin');
const { test_mw } = require("@test");

const express = require('express');
const routes = express.Router();

routes.use('/admin/', adminRoutes);
routes.use('/skills/', skillsRoutes);
routes.use('/abilities/', abilitiesRoutes);
routes.use('/projects/', projectsRoutes);
routes.use('/projectImages/', projectImagesRoutes);
  
module.exports = routes;
