const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Listen for client connections
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  // Handle player movement events
  socket.on('move', (direction) => {
    console.log(`Player ${socket.id} moved ${direction}`);
    // TODO: Update the game state with the player's movement
  });

  // Handle player disconnect events
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    // TODO: Remove the player from the game state
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
