const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password.'
    })
  }

  res.status(200).send({
    username: user.username
  });
});

module.exports = loginRouter;
