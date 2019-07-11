/**
 * Be sure to ignore .env file from being committed.
 */
require('dotenv').config();
const config = require('config');
const server = require('http').createServer();
const io = require('socket.io')(server);
const initServer = require('./src/sockets/initSocket');
const express = require('express');
const dbConnect = require('./src/database/connector');

const chatrooms = require('./src/routes/chatrooms');
const participants = require('./src/routes/participants');
const users = require('./src/routes/users');

async function initServer() {
  /**
   * Load environment variables;
   */
  if (!config.get('jwt.key')) {
    console.error("JWT private key not provided.");
    process.exit(1);
  }

  const app = express();
  /**
   * Initialize Database
   */
  await dbConnect();

  /**
   * Sockets go here
   */
  io.on('connection', initServer);

  /**
   * Middlewares go here
   */

  app.use(express.json());
  /**
   * Routers goes here
   */
  app.use('/health', (req, res) => res.send("Health checked"))
  app.use('/api/chatrooms', chatrooms);
  app.use('/api/participants', participants);
  app.use('/api/users', users);

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

