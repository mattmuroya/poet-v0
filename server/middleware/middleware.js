const { info } = require('../utils/info');

const reqLogger = (req, _res, next) => {
  info('---');
  info('Time:   ', (new Date()).toLocaleTimeString());
  info('Method: ', req.method);
  info('Path:   ', req.path);
  info('Body:   ', req.body, '\n');
  next();
};

const tokenExtractor = (req, _res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7);
  }
  next();
};

const catchAll = (_req, res) => {
  res.status(404).json({ error: 'Unknown endpoint.' });
};

module.exports = {
  reqLogger,
  tokenExtractor,
  catchAll,
};
