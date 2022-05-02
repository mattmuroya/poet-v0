const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('buddyList', {
      screenName: 1,
      id: 1
    });
  res.json(users);
});

module.exports = userRouter;
