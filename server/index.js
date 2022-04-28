const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const { PORT } = require('./utils/config');

const server = http.createServer(app);
const io = new Server(server);

// listen for 'connection' event (built-in)
io.on('connection', socket => {
  console.log('user connected');

  //listen for 'disconnect' even (built-in)
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
