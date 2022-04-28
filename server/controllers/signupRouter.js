const signupRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

signupRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).json({ error: 'Username and password required.' });
  }

  if (await User.findOne({ username })) {
    return res.status(409).json({
      error: 'Username already exists.'
    });
  }

  if (username.length > 32) {
    return res.status(400).json({
      error: 'Usernames limited to 32 characters.'
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters.'
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    passwordHash
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = signupRouter;
