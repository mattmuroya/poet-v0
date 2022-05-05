const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const { PORT } = require('./utils/config');
const { info } = require('./utils/info')

const server = http.createServer(app);
const io = new Server(server);
const socket = require('./socket');

io.on('connection', socket => {
  info('---');
  info('user connected');
  info(socket.id)

  socket.on('join_room', (roomId) => {
    socket.join(roomId)
    console.log(`Socket ${socket} joined Room ${roomId}`)
  })

  // socket.on('send_message', message => {
  //   console.log('message sent to server');
  //   io.emit('receive_message', message);
  // });

  socket.on('disconnect', () => {
    info('user disconnected');
  });
});

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
