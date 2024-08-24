const {sendResponse} = require('@handlers');
const {abilitiesQuery} = require('@queries');
const {htmlSanitizer} = require('@utils');
const { dataFormatter } = require('@utils');

// Get all users
exports.getAbilities = async (req, res) => {
    try {
        const abilities = new abilitiesQuery();
        const response = await abilities.getAll();

        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAbility = async (req, res) => {
    try {
        const id = req.params.id;
        const abilities = new abilitiesQuery();
        const response = await abilities.getOne(id);

        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.addAbility = async (req, res) => {
    try {
        const abilityInfo = await htmlSanitizer(req.body.data.info);
        const adminId = await req.session.adminId;

        const abilities = new abilitiesQuery();
        const response = await abilities.addOne(adminId, abilityInfo);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateAbility = async (req, res) => {
    try {
        const abilityInfo = await htmlSanitizer(req.body.data.info);
        const id = await req.body.data.id;

        const abilities = new abilitiesQuery();
        const response = await abilities.updateOne(id, abilityInfo);
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, 'updateOne', response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteAbility = async (req, res) => {    
    try {
        const id = req.body.data;
        const abilities = new abilitiesQuery();
        const response = await abilities.deleteOne(id);
        sendResponse(res, id, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteAbilities = async (req, res) => {
    try {
        const abilities = new abilitiesQuery();
        await abilities.deleteAll();
        responseHandler.sendSuccess(res, { message: 'This is a successful response!' }, 'success' ,201);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};