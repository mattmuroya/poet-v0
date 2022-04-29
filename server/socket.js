const socket = socket => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};

module.exports = socket;
