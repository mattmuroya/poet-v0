const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./utils/config');

(async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('MongoDB connected.');
  } catch (err) {
    console.log('MongoDB connection error: ', err.message);
  }
})();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(express.json());

// TOKEN EXTRACTOR

// ROUTES

// CATCHALL ENDPOINT
// ERROR HANDLER

module.exports = app;
