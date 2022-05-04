const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('buddyList', {
      screenName: 1,
      id: 1
    });
  res.json(users);
});

userRouter.post('/sign-on', async (req, res) => {
  const { screenName, password } = req.body;
  const user = await User.findOne({ screenName })
    // populate buddyList with screenName (and id by default) only
    .populate('buddyList', 'screenName');

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid ScreenName or password.'
    })
  }

  const token = jwt.sign({
    screenName: user.screenName,
    id: user._id
  },
  process.env.JWT_SECRET,
  { expiresIn: 60*60 });

  res.status(200).json({
    token,
    screenName: user.screenName,
    buddyList: user.buddyList,
    id: user._id.toString(),
  });
});

userRouter.post('/register', async (req, res) => {
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

module.exports = userRouter;
