const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.ensureFolderExists = (req, res, next) => {
  const uploadFolderPath = path.join(__dirname, "../../../../src/folders");

  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, { recursive: true });
  }

  next();
};

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolderPath = path.join(__dirname, "../../../../src/folders");
    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath, { recursive: true });
    }
    cb(null, uploadFolderPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("file");

exports.uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Internal error during file upload:', err);
      return res.status(500).json({ error: err.message });
    }

    // Make sure 'req.file' is initialized and valid before proceeding
    if (!req.file) {
      return next();
    }

    // Check if the uploaded file has the correct MIME type
    const file = req.file;
    const allowedMimeTypes = ['video/mp4', 'image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: "Only mp4, jpg, and png files are allowed" });
    }

    // File is secure, attach it to the request object for later use
    req.uploadedFile = file;

    // Proceed to the next middleware or route handler
    next();
  });
};
exports.getFile = async (req, res, next) => {
  const filePath = decodeURI(req.params.filePath);

  if (filePath) {
    // Assuming you're using Express.js
    let file = path.resolve(filePath);

    if (!file) {
      res.status(404).send("File not found");
    } else {
      try {
        const stats = fs.statSync(file);

        if (!stats.isFile()) {
          res.status(400).send("Invalid file path");
        } else {
          // Send the file as the response
          res.sendFile(file);
        }
      } catch (error) {
        console.error("Error while trying to get the file stats:", error);
        res.status(500).send("Internal Server Errorrrr");
      }
    }
  } else {
    res.status(400).send("File path is required");
  }
};
