const express = require("express");
const {
  projectImagesController: {
    getProjectImage,
    addProjectImage,
    deleteProjectImage,
    deleteProjectImages,
    updateProjectImage,
  },
  
} = require("@controller");
const { projectImagesValidator, validationResult, } = require('@validators')
const { multer, resizer } = require("@middlewares");
const router = express.Router();

// Define routes
router.get("/getOne/:id", getProjectImage);
router.post("/addOne", multer.fileUploader, resizer, projectImagesValidator, validationResult, addProjectImage);
router.put("/updateOne", multer.fileUploader, resizer, projectImagesValidator, validationResult, updateProjectImage);
router.delete("/deleteOne", deleteProjectImage);
router.post("/deleteAll", deleteProjectImages);

module.exports = router;
