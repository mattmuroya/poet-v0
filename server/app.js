const express = require('express');
const app = express();

// DB CONNECT

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(express.json());

// TOKEN EXTRACTOR

// ROUTES

// CATCHALL ENDPOINT
// ERROR HANDLER

module.exports = app;
