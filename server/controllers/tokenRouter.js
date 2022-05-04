const tokenRouter = require('express').Router();
const jwt = require('jsonwebtoken');

tokenRouter.post('/verify', async (req, res) => {
  try {
    // jwt.verify should throw error if token is expired
    jwt.verify(req.token, process.env.JWT_SECRET);
    res.json({
      valid: true
    });
  } catch (err) {
    res.json({
      valid: false
    });
  }
});

module.exports = tokenRouter;
