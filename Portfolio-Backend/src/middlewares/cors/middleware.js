const express = require('express');
const cors = require('cors');

const app = express();

// Middleware configuration based on environment
const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'development') {
      // Allow all origins in development mode
      callback(null, true);
    } else {
      // Restrict origins in production mode
      if (process.env.CLIENT.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Error handling for CORS
app.use((err, req, res, next) => {
  if (err) {
    console.error('CORS Error:', err.message);
    res.status(403).json({ message: err.message });
  } else {
    next();
  }
});

module.exports = app;
