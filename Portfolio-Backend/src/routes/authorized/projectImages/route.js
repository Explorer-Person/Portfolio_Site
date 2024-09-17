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
router.post("/addOne", multer.fileUploader, projectImagesValidator, validationResult, resizer, addProjectImage);
router.put("/updateOne", multer.fileUploader, projectImagesValidator, validationResult, resizer, updateProjectImage);
router.delete("/deleteOne", deleteProjectImage);
router.post("/deleteAll", deleteProjectImages);

module.exports = router;
