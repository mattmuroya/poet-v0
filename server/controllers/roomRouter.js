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

roomRouter.get('/buddy-chat', async (req, res) => {
  const { userId, buddyId } = req.query;
  // may need to add buddy chat property to differentiate from group chatroom
  const buddyRoom = await Room.findOne({
    users: { $all: [userId, buddyId]
  }});

  if (!buddyRoom) {
    return res.status(404).json({
      error: 'Conversation not found.'
    })
  }
  // console.log(buddyRoom);
  res.json(buddyRoom);
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
