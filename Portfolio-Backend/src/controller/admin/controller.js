const {sendResponse} = require('@handlers');
const {adminQuery} = require('@queries');
const {htmlSanitizer} = require('@utils');
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
        const formattedData = await dataFormatter(response.data)[0];

        if(response.status === true){
        req.session.isAuth = true;
        req.session.adminId = formattedData.id; 
        return req.session.save((err)=>{
            if (err) {
             return sendResponse(res, {message: 'Something Went Wrong...'}, response.process, response.status, response.statusCode);
            }
        
            sendResponse(res, response.data, response.process, response.status, response.statusCode);
        })
       }      
       else{
        sendResponse(res, response.data, response.process, response.status, response.statusCode);
       }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateAdmin = async (req, res) => {
    
    try {
        const { body } = await req;
        const file = req.file ? JSON.stringify(file && { filePath: file.path, fileName: file.filename }) : null;
        const jsonData = req.file ? JSON.parse(body.data) : body.data; // Parse the JSON data from the body
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



