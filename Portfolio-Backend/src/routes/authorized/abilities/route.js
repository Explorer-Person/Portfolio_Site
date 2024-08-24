const express = require("express");
const {
  abilitiesController: {
    getAbility,
    addAbility,
    deleteAbility,
    deleteAbilities,
    updateAbility,
  },
} = require("@controller");
const { abilitiesValidator, validationResult, } = require('@validators')
const router = express.Router();

const { test_mw } = require("@test");

// Define routes
router.get("/getOne/:id", getAbility);
router.post("/addOne", abilitiesValidator, validationResult, addAbility);
router.put("/updateOne", abilitiesValidator, validationResult, updateAbility);
router.delete("/deleteOne", deleteAbility);
router.post("/deleteAll", deleteAbilities);

module.exports = router;
