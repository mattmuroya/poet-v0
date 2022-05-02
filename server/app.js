const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./utils/config');
const { info } = require ('./utils/info');

const middleware = require('./middleware/middleware');
const userRouter = require('./controllers/userRouter');
const roomRouter = require('./controllers/roomRouter');
const registerRouter = require('./controllers/registerRouter');
const signOnRouter = require('./controllers/signOnRouter');

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
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/register', registerRouter);
app.use('/api/sign-on', signOnRouter);

// CATCHALL ENDPOINT
app.use(middleware.catchAll);

// ERROR HANDLER

module.exports = app;
