const registerRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

registerRouter.post('/', async (req, res) => {
  const { screenName, password } = req.body;

  if (!(screenName && password)) {
    return res.status(400).json({ error: 'ScreenName and password required.' });
  }

  if (await User.findOne({ screenName })) {
    return res.status(409).json({
      error: 'ScreenName already exists.'
    });
  }

  if (screenName.length > 32) {
    return res.status(400).json({
      error: 'ScreenName limited to 32 characters.'
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters.'
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    screenName,
    passwordHash
  });
  await user.save();
  res.status(201).json(user);
});

module.exports = registerRouter;
