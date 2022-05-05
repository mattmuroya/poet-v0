const roomRouter = require('express').Router();
const Room = require('../models/room');
const jwt = require('jsonwebtoken');

// roomRouter.get('/all', async (req, res) => {
//   const rooms = await Room.find({})
//     .populate('users', {
//       screenName: 1,
//       id: 1
//   });
//   res.json(rooms);
// });

roomRouter.use('/', (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({
      error: 'Token missing, invalid, or expired.'
    });
  }
});

roomRouter.get('/', async (req, res) => {
  const { userId, buddyId } = req.query;
  // may need to add buddy chat property to differentiate from group chatroom
  const room = await Room.findOne({
    users: { $all: [userId, buddyId]
  }})
  .populate('users', {
    screenName: 1,
    id: 1
  });

  if (!room) {
    return res.status(404).json({
      error: 'Conversation not found.'
    })
  }
  res.json(room);
});

// roomRouter.get('/group-chat' async (req, res) => {
//   res.json('not yet implemented');
// });

roomRouter.post('/', async (req, res) => {
  const { users } = req.body;
  const room = new Room({
    users
  });
  const savedRoom = await room.save();
  res.status(201).json(savedRoom);
});

// roomRouter.get('/:id', async (req, res) => {
//   const room = await Room.findById(req.params.id);
//   res.json(room);
//   console.log(room);
// })

module.exports = roomRouter;
