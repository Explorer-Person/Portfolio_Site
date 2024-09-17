
const Jimp = require("jimp");
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require('node:fs');
module.exports = async (req, res, next) => {
  if (!req.file) {
  console.log(req.file, 'FilePath');

    return next();
  }

  let filePath = req.file.path;
  const mimeType = req.file.mimetype;
  const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  const videoMimeTypes = ["video/mp4"];


  filePath = filePath.replace(/\\/g, "/");
  console.log("Normalized Path: ", filePath);
  // Process image files
  if (imageMimeTypes.includes(mimeType)) {
    try {
      console.log("Normalized Path: ", filePath);      
      const media = await Jimp.read(filePath);

      // Set the target dimensions for image resizing
      const width = 600; // Change this to your desired width
      const height = 400; // Change this to your desired height

      await media.resize(width, height).writeAsync(filePath);

      console.log("Image processing completed");
      return next();
    } catch (err) {
      console.error("Error while processing the image:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Process video files
  if (videoMimeTypes.includes(mimeType)) {
    try {
      const outputPath = path.join(path.dirname(filePath), `processed_${req.file.filename}`); // Define output path

      ffmpeg.setFfmpegPath(ffmpegStatic);

      ffmpeg(filePath)
        .output(outputPath)
        .videoCodec("libx264")
        .size("600x400")
        .on("error", (err) => {
          console.log("Error:", err.message);
          return res.status(500).json({ error: "Internal Server Error" });
        })
        .on("progress", (progress) => {
          console.log("Progress:", progress.frames);
        })
        .on("end", () => {
          console.log("Video compression complete!");

          // Replace the original file with the new one
          fs.renameSync(outputPath, filePath);
          next();
        })
        .run();
    } catch (err) {
      console.error("Error while processing the video:", err);
      if (!res.headersSent) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    // If file type is not image or video
    if (!res.headersSent) {
      return res.status(400).json({ error: "Unsupported file type" });
    }
  }
};
