const tokenRouter = require('express').Router();
const jwt = require('jsonwebtoken');

tokenRouter.post('/verify', async (req, res) => {
  try {
    // jwt.verify should throw error if token is expired
    const { screenName, id } = jwt.verify(req.token, process.env.JWT_SECRET);

    const newToken = jwt.sign({ screenName, id},
      process.env.JWT_SECRET,
      { expiresIn: 60*60*24 }
    );

    res.json({
      valid: true,
      newToken
    });
  } catch (err) {
    res.json({
      valid: false
    });
  }
});

module.exports = tokenRouter;
