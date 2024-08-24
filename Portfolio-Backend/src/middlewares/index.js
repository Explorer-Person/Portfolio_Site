const auth = require('./auth');
const helmet = require('./helmet');
const multer = require('./multer');
const cors = require('./cors');
const resizer = require('./resizer');

module.exports = { resizer, multer, cors, auth, helmet}