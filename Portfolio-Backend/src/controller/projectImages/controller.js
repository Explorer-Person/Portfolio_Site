const {sendResponse} = require('@handlers');
const {projectImagesQuery} = require('@queries');
const {htmlSanitizer} = require('@utils');
const { dataFormatter } = require('@utils');


// Get all users
exports.getProjectImages = async (req, res) => {
    try {
        const projectImages = new projectImagesQuery();
        const response = await projectImages.getAll();
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProjectImage = async (req, res) => {
    try {
        const id = await req.params.id;
        const projectImages = new projectImagesQuery();
        const response = await projectImages.getOne(id);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getSelectedProjectImages = async (req, res) => {
    try {
        const fk = req.params.fk;
        const projectImages = new projectImagesQuery();
        const response = await projectImages.getSelected(fk);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.addProjectImage = async (req, res) => {
    try {
        const { body } = await req;
        const file = req.file ? JSON.stringify(req.file && { filePath: req.file.path, fileName: req.file.filename }) : null;
        const jsonData = req.file ? JSON.parse(body.data) : body.data; // Parse the JSON data from the body
        
        const projectImagesInfo = await htmlSanitizer(jsonData.info);
        const fk = await jsonData.fk;

        const data = {
            ...projectImagesInfo,
            file: file
        };
        
        const projectImages = new projectImagesQuery();
        const response = await projectImages.addOne(fk, data);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateProjectImage = async (req, res) => {
    try {
        const { body } = await req;
        const file = await req.file ? JSON.stringify(req.file && { filePath: req.file.path, fileName: req.file.filename }) : null;
        const jsonData = await req.file ? JSON.parse(body.data) : body.data; // Parse the JSON data from the body
        
        const projectImagesInfo = await htmlSanitizer(jsonData.info);
        const id = await jsonData.id;

        const data = {
            ...projectImagesInfo,
            file: file
        };
        
        const projectImages = new projectImagesQuery();
        const response = await projectImages.updateOne(id, data);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, 'update', response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProjectImage = async (req, res) => {
    try {
        const id = req.body.data;
        const projectImages = new projectImagesQuery();
        const response = await projectImages.deleteOne(id);

        const formattedData = dataFormatter(response.data)
  
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProjectImages = async (req, res) => {
    try {
        const projectImages = new projectImagesQuery();
        const result = await projectImages.deleteAll();
        responseHandler.sendSuccess(res, { message: 'This is a successful response!' }, 'success' ,201);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};