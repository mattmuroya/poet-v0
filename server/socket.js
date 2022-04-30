const { info } = require('./utils/info');

const socket = socket => {
  console.log('user connected');

  socket.on('disconnect', () => {
    info('user disconnected');
  });
};

module.exports = socket;
