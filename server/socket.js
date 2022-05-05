const { info } = require('./utils/info');

const socket = socket => {
  info('---');
  info('user connected');
  info(socket.id)

  socket.on('send_message', message => {
    console.log('message sent to server');
    io.emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    info('user disconnected');
  });
};

module.exports = socket;
