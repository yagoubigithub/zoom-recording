const WebSocket = require('ws');
const http = require('http');
const path = require("path");
const express = require("express");


const app = express();

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Broadcast function: sends data to all connected clients
function broadcast(data, sender) {
  wss.clients.forEach(function each(client) {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // When receiving audio data from a client
  ws.on('message', (data) => {
    broadcast(data, ws); // Broadcast to other clients
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

// Start the server
server.listen(4005 ,  () => {
  console.log('Server is listening on port 4005');
});
