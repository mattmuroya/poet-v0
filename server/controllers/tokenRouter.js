const tokenRouter = require('express').Router();
const jwt = require('jsonwebtoken');

tokenRouter.post('/validate', async (req, res) => {
  try {
    // jwt.verify should throw error if token is expired
    // const decodedToken = ;
    // console.log(jwt.verify(req.token, process.env.JWT_SECRET));
    // if (!decodedToken.id) {
    //   return res.status(401).json({
    //     error: 'Token missing or invalid.'
    //   });
    // }
    console.log('start try block');
    console.log(req.token)
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    console.log(token);
    console.log(decodedToken);

    res.status(200).json({
      valid: true
    });
  } catch (err) {
    res.status(401).json({
      error: 'Token expired or invalid.'
    });
  }
});

module.exports = tokenRouter;
