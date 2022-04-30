const signOnRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

signOnRouter.post('/', async (req, res) => {
  const { screenName, password } = req.body;
  const user = await User.findOne({ screenName });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid ScreenName or password.'
    })
  }

  res.status(200).send({
    screenName: user.screenName
  });
});

module.exports = signOnRouter;
