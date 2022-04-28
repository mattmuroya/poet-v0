
const reqLogger = (req, _res, next) => {
  console.log('---');
  console.log('Time:   ', (new Date()).toLocaleTimeString());
  console.log('Method: ', req.method);
  console.log('Path:   ', req.path);
  console.log('Body:   ', req.body);
  next();
};

const catchAll = (_req, res) => {
  res.status(404).json({ error: 'Unknown endpoint.' });
};

module.exports = {
  reqLogger,
  catchAll,
};