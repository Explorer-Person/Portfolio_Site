const { sendResponse } = require('@handlers');
const { adminQuery } = require('@queries');
const { htmlSanitizer } = require('@utils');
const { dataFormatter } = require('@utils');


// Get all users
exports.getAdmin = async (req, res) => {
    try {
        const admin = new adminQuery();
        const response = await admin.getOne();
        const formattedData = dataFormatter(response.data)
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.signupAdmin = async (req, res) => {
    try {
        const adminInfo = await htmlSanitizer(req.body)

        const admin = new adminQuery();
        const response = await admin.addOne(adminInfo);
        const formattedData = dataFormatter(response.data)

        sendResponse(res, formattedData, response.process, response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.loginAdmin = async (req, res) => {
    try {
        const adminInfo = await htmlSanitizer(req.body)
        const admin = new adminQuery();
        const response = await admin.auth(adminInfo);
        console.log(response, 'soemthing')

        const formattedData = await dataFormatter(response.data);

        if (response.status === true) {
            req.session.isAuth = true;
            req.session.adminId = formattedData.id;
            return req.session.save((err) => {
                if (err) {
                    return sendResponse(res, { message: 'Something Went Wrong...' }, response.process, response.status, response.statusCode);
                }

                sendResponse(res, response.data, 'login', response.status, response.statusCode);
            })
        }
        else {
            sendResponse(res, response.data, response.process, response.status, response.statusCode);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateAdmin = async (req, res) => {

    try {
        const { body } = await req;
        console.log(req.file)
        const file = await req.file ? JSON.stringify(req.file && { filePath: req.file.path, fileName: req.file.filename }) : null;
        console.log(file)
      
        const jsonData = body.data; // Parse the JSON data from the body
        const adminInfo = await htmlSanitizer(jsonData.info);

        const data = {
            ...adminInfo,
            file: file,
        };


        const id = await jsonData.id;

        const admin = new adminQuery();
        const response = await admin.updateOne(id, data);

        const formattedData = await dataFormatter(response.data)

        sendResponse(res, formattedData, response.process, response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteAdmin = async (req, res) => {
    const id = escapeHTML(req.body.id);

    try {
        const admin = new adminQuery();
        const response = await admin.deleteOne(id);
        sendResponse(res, response.data, response.process, response.status, response.statusCode);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



