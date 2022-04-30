const { info } = require('./utils/info');

const socket = socket => {
  info('---');
  info('user connected');
  info(socket.id)

  socket.on('disconnect', () => {
    info('user disconnected');
  });
};

module.exports = socket;
