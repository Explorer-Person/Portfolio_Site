const {sendResponse} = require('@handlers');
const {projectsQuery} = require('@queries');
const {htmlSanitizer} = require('@utils');
const { dataFormatter } = require('@utils');


// Get all users
exports.getProjects = async (req, res) => {
    try {
        const projects = new projectsQuery();
        const response = await projects.getAll();
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProject = async (req, res) => {
    try {
        const id = req.params.id;
        const projects = new projectsQuery();
        const response = await projects.getOne(id);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.addProject = async (req, res) => {
    try {
        const { body } = await req;
        const file = req.file ? JSON.stringify(req.file && { filePath: req.file.path, fileName: req.file.filename }) : null;
        const jsonData = req.file ? JSON.parse(body.data) : body.data; // Parse the JSON data from the body
        
        const projectInfo = await htmlSanitizer(jsonData.info);
        const fk = await jsonData.fk;

        const data = {
            ...projectInfo,
            file: file
        };
        const projects = new projectsQuery();
        const response = await projects.addOne(fk, data);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateProject = async (req, res) => {
    try {
        const { body } = await req;
        const file = req.file ? JSON.stringify(req.file && { filePath: req.file.path, fileName: req.file.filename }) : null;
        const jsonData = req.file ? JSON.parse(body.data) : body.data; // Parse the JSON data from the body
        const projectsInfo = await htmlSanitizer(jsonData.info);

        const id = jsonData.id;

        const data = {
            ...projectsInfo,
            file: file
        };
        const projects = new projectsQuery();
        const response = await projects.updateOne(id, data);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, 'update', response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProject = async (req, res) => {
    try {
        const id = req.body.data.info;
        const projects = new projectsQuery();
        const response = await projects.deleteOne(id);
        sendResponse(res, id, response.process, response.status, response.statusCode);
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProjects = async (req, res) => {
    try {
        const projects = new projectsQuery();
        await projects.deleteAll();
        responseHandler.sendSuccess(res, { message: 'This is a successful response!' }, 'success' ,201);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};