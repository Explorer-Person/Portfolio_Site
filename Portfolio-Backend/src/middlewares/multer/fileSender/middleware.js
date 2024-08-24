const express = require("express");
const {
  fileController: {
    getFile
  }
} = require("@controller");
const middleware = express.Router();

const { test_mw } = require("@test");


middleware.use(getFile);

module.exports = middleware;





