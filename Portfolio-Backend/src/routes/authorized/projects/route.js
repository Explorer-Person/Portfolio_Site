const express = require("express");
const {
  projectsController: {
    getProject,
    addProject,
    deleteProject,
    deleteProjects,
    updateProject,
  },
} = require("@controller");
const { multer, resizer } = require("@middlewares");
const { validationResult, projectsValidator } = require('@validators')
const router = express.Router();
const { test_mw } = require("@test");

// Define routes
router.get("/getOne/:id", getProject);
router.post("/addOne", multer.fileUploader, projectsValidator, resizer, validationResult, addProject);
router.put("/updateOne", multer.fileUploader, projectsValidator, resizer, validationResult, updateProject);
router.delete("/deleteOne", deleteProject);
router.post("/deleteAll", deleteProjects);

module.exports = router;
