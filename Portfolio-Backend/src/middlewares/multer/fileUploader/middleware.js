const express = require("express");
const {
  fileController: {
    ensureFolderExists,
    uploadFile,
  }
} = require("@controller");
const middleware = express.Router();



middleware.use(ensureFolderExists);
middleware.use(uploadFile);

module.exports = middleware;