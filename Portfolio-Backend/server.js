require('dotenv').config();
require('module-alias/register');
require('./module-alias');
const express = require('express');
const bp = require('body-parser')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const {cors, helmet, auth} = require('@middlewares');
const path = require('path');
const {GlobalErrorHandler} = require('@handlers');
const {routes} = require('@routes');

const app = express();
const port = process.env.PORT || 3000;


// Middlewares
app.use(morgan('dev'));
app.use(helmet);
app.use(express.json());

// in latest body-parser use like below.
app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors);

app.use(auth.session);
app.use(auth.authorize_check);

// Routes
app.use('/api/', routes);

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use('/portfolio', express.static(path.join(__dirname, 'client/dist')));
app.use('/portfolio/projects', express.static(path.join(__dirname, 'client/dist')));
app.use('/portfolio/admin/login', express.static(path.join(__dirname, 'client/dist')));
app.use('/portfolio/admin/signup', express.static(path.join(__dirname, 'client/dist')));

app.get('/portfolio/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});
app.get('/portfolio/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});
app.get('/portfolio/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});
app.get('/portfolio/admin/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

// Error handling
app.use(GlobalErrorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
  