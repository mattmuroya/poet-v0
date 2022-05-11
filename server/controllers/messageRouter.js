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
  const { room } = req.query;
  const messages = await Message.find({
    room
  }).populate('author', { screenName: 1 });
  res.json(messages);
});

messageRouter.post('/', async (req, res) => {
  const { room, text, timestamp  } = req.body;
  const author = jwt.verify(req.token, process.env.JWT_SECRET).id;
  const message = new Message({
    author,
    room,
    text,
    timestamp: timestamp ? new Date(timestamp) : new Date()
  });
  const savedMessage = await message.save();
  res.status(201).json(savedMessage);
});

module.exports = messageRouter;
