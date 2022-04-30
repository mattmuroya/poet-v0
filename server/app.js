const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./utils/config');
const { info } = require ('./utils/info');

const middleware = require('./middleware/middleware');
const signupRouter = require('./controllers/signupRouter');

(async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    info('MongoDB connected.');
  } catch (err) {
    info('MongoDB connection error: ', err.message);
  }
})();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(express.json());

app.use(middleware.reqLogger);

// TOKEN EXTRACTOR

// ROUTES
app.use('/api/signup', signupRouter);

// CATCHALL ENDPOINT
app.use(middleware.catchAll);

// ERROR HANDLER

module.exports = app;
