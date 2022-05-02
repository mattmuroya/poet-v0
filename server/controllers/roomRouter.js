const roomRouter = require('express').Router();
const Room = require('../models/room');

roomRouter.get('/', async (req, res) => {
  const rooms = await Room.find({})
    .populate('users', {
      screenName: 1,
      id: 1
  });
  res.json(rooms);
});

roomRouter.post('/', async (req, res) => {
  const { users } = req.body;

  const room = new Room({
    users
  });

  const savedRoom = await room.save();
  res.status(201).json(savedRoom);
});

module.exports = roomRouter;
