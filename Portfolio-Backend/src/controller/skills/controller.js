const {sendResponse} = require('@handlers');
const {skillsQuery} = require('@queries');
const {htmlSanitizer} = require('@utils');
const { dataFormatter } = require('@utils');


// Get all users
exports.getSkills = async (req, res) => {
    try {
        const skills = new skillsQuery();
        const response = await skills.getAll();
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getSkill = async (req, res) => {
    try {
        const id = req.params.id;
        const skills = new skillsQuery();
        const response = await skills.getOne(id);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.addSkill = async (req, res) => {
    try {
        const { body } = await req;
        const file = req.file ? JSON.stringify(req.file && { filePath: req.file.path, fileName: req.file.filename }) : null;
        const jsonData = body.data; // Parse the JSON data from the body

        const skillInfo = await htmlSanitizer(jsonData.info);
        const fk = await req.session.adminId;
        
        const data = {
            ...skillInfo,
            file: file,
        };   

        const skills = new skillsQuery();
        const response = await skills.addOne(fk, data);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateSkill = async (req, res) => {
    try {
        const { body } = await req;
        const file = req.file ? JSON.stringify(req.file && { filePath: req.file.path, fileName: req.file.filename }) : null;
        const jsonData = body.data; // Parse the JSON data from the body

        const skillInfo = await htmlSanitizer(jsonData.info);
        const id = await jsonData.id;

        const data = {
            ...skillInfo,
            file: file,
        };
        const skills = new skillsQuery();
        const response = await skills.updateOne(id, data);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, 'update', response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteSkill = async (req, res) => {
    try {
        const id = await req.body.data;

        const skills = new skillsQuery();
        const response = await skills.deleteOne(id);
        const formattedData = dataFormatter(response.data)
  
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteSkills = async (req, res) => {
    try {
        const skills = new skillsQuery();
        const response = await skills.deleteAll();
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};