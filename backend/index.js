
const config = require('config');
const server = require('http').createServer();
const io = require('socket.io')(server);
const initSocket = require('./src/sockets/initSocket');
const express = require('express');

async function initServer() {
  const app = express();
  /**
   * Initialize Database
   */

  /**
   * Sockets go here
   */
  io.on('connection', initSocket);

  /**
   * Middlewares go here
   */

  app.use(express.json());
  /**
   * Routers goes here
   */

  /**
   * Initialize Server
   */
  const port = config.get('server.port') || 8080;
  server.listen(port, () => console.log(`
    Chat Application
    Application initiated.
    Listening on port ${port}.
  `))
}

initServer();

