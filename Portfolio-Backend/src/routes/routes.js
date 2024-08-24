const express = require('express');
const { authorized } = require('./authorized/');
const { unauthorized } = require('./unauthorized/');
const {auth} = require('@middlewares');
const routes = express.Router();

const { test_mw } = require("@test");
routes.use('/authorized/', auth.check, authorized);
routes.use('/', unauthorized);

module.exports = routes
