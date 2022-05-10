const messageRouter = require('express').Router();
const Message = require('../models/message');
const jwt = require('jsonwebtoken');

messageRouter.use('/', (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({
      error: 'Token missing, invalid, or expired.'
    });
  }
});

messageRouter.get('/', async (req, res) => {
  const { roomId } = req.query;
  const messages = await Message.find({
    roomId
  });

  console.log(messages);
});