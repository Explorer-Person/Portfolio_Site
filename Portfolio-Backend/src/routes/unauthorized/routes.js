const authRoutes = require('./auth');
const { sendResponse } = require("@handlers");

const {
  adminController: {
    getAdmin,
  },
  skillsController: {
    getSkills,
  },
  projectsController: {
    getProjects,
  },
  projectImagesController: {
    getSelectedProjectImages,
    getProjectImages,
  },
  abilitiesController: {
      getAbilities,
  },
  fileController: {
    getFile
  }
  
} = require("@controller");
const express = require('express');
const routes = express.Router();

routes.use('/auth/', authRoutes);
routes.get('/skills/getAll', getSkills);
routes.get("/projects/getAll", getProjects);
routes.get("/projectImages/getAll", getProjectImages);
routes.get("/projectImages/getSelected/:fk", getSelectedProjectImages);
routes.get("/abilities/getAll", getAbilities);
routes.get('/file/getOne/:filePath', getFile);
routes.get('/admin/getOne', getAdmin);

module.exports = routes;
