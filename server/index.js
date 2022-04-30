const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const { PORT } = require('./utils/config');
const { info } = require('./utils/info')

const server = http.createServer(app);
const io = new Server(server);
const socket = require('./socket');

io.on('connection', socket);

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
