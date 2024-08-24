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
router.put("/updateOne", multer.fileUploader, resizer, test_mw, adminValidator, validationResult, updateAdmin );
router.delete("/deleteOne", deleteAdmin);

module.exports = router;
