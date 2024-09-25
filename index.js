// Import dependencies
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path");
// Create the app and server
const app = express();
app.use(
  cors({
    origin: "*", // Allow only the client with entering the url of client
  })
);
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

app.get("/client", (request, response) => {
  response.sendFile(`${__dirname}/client.html`);
});

app.get("/users", (request, response) => {
  console.log(users);
  response.status(200).json(users);
});
const users = {};
// Handle new socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle incoming audio stream
  socket.on("audioStream", (audioData) => {
    
    socket.broadcast.emit("audioStream", audioData);
  });

  socket.on("new-user", (name) => {
    users[socket.id] = name; // Store the user's name with their socket ID

    // Notify all other clients that a new user has joined
    socket.broadcast.emit("user-connected", name);
    console.log(`${name} has joined the chat`);
  });

  socket.on("disconnect", () => {
    const name = users[socket.id]; // Get the user's name

    if (name) {
      // Notify all other clients that the user has disconnected
      socket.broadcast.emit("user-disconnected", name);
      console.log(`${name} has left the chat`);

      // Remove the user from the users object
      delete users[socket.id];
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
