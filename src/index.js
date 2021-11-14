const http = require('http');
const { Server } = require('socket.io');
const winston = require('winston');

// Loger Setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'moochat-socket-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log'}),
  ],
});

if (process.env.NODE_ENV !== 'production' ) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
};

// Socket Server Setup
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
    allowedHeaders: '*',
  }
});

io.on("connection", (socket) => {
  logger.info('a user has connected');
});

const port = process.env.PORT || 3010;
server.listen(port, () => {
  logger.info(`listening on port ${port}`)
});
