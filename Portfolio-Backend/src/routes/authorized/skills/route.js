const { test_mw } = require("@test");
const express = require("express");
const {
  skillsController: {
    addSkill,
    deleteSkill,
    deleteSkills,
    getSkill,
    updateSkill,
  },
} = require("@controller");
const { resizer, multer } = require("@middlewares");
const { validationResult, skillsValidator } = require('@validators')
const router = express.Router();

// Define routes
router.get("/getOne/:id", getSkill);
router.post("/addOne", multer.fileUploader, test_mw, resizer, skillsValidator, validationResult, addSkill);
router.put("/updateOne", multer.fileUploader, test_mw, resizer, skillsValidator, validationResult, updateSkill);
router.delete("/deleteOne", deleteSkill);
router.post("/deleteAll", deleteSkills);

module.exports = router;
