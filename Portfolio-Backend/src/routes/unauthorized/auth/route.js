

const express = require("express");
const {
  adminController: {
    signupAdmin,
    loginAdmin,
  },
} = require("@controller");
const { validationResult, loginValidator, signupValidator } = require('@validators')
const router = express.Router();


router.post("/signup", signupValidator, validationResult, signupAdmin);
router.post("/login", loginValidator, validationResult, loginAdmin);

module.exports = router;