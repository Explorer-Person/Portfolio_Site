const express = require("express");
const {
  adminController: {
    updateAdmin,
    deleteAdmin,
    getAdmin,
  },
} = require("@controller");
const { multer, resizer } = require("@middlewares");
const { adminValidator, validationResult, } = require('@validators')
const router = express.Router();
const { test_mw } = require("@test");

// Define routes
router.get("/get", getAdmin);
router.get("/getOne", getAdmin);
router.put("/updateOne", multer.fileUploader, adminValidator, validationResult, resizer, updateAdmin );
router.delete("/deleteOne", deleteAdmin);

module.exports = router;
