/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const setupDatabase = require('./main');
const createFolderIfNotExists = require('./utils/createFolderIfNotExists');
const commentsRoutesFactory = require('./routes/commentsRoutes');

// Create necessary folders for uploads
createFolderIfNotExists(path.join(__dirname, 'uploads', 'images'));
createFolderIfNotExists(path.join(__dirname, 'uploads', 'text'));

// Set up Express app, HTTP server, Socket.IO, and comments routes with injected io object
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const commentsRoutes = commentsRoutesFactory(io);

app.use(cors());
app.use(express.json());

app.use('/comments', commentsRoutes);

app.use('/uploads', express.static('uploads'));

// Initialize DB, start server, and handle WebSocket connections
const PORT = process.env.PORT || 5000;

(async() => {
  try {
    await setupDatabase();

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  } catch (error) {
    console.error('Error while creating tables:', error);
  }
})();
