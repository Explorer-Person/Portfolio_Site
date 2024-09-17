const express = require('express');
const { authorized } = require('./authorized/');
const { unauthorized } = require('./unauthorized/');
const {auth} = require('@middlewares');
const routes = express.Router();

routes.use('/authorized/', auth.check, authorized);
routes.use('/', unauthorized);

module.exports = routes
