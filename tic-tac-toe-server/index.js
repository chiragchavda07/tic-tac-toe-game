const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const MAX_CLIENTS_PER_ROOM = 2;
const roomClients = {};
const symbols = ["O", "X"];
var symbol_assigning_index = 0;
io.on("connection", (socket) => {
  console.log(`A new user connected with id: ${socket.id}`);
    socket.on("join_room", (room) => {
      if (!roomClients[room]) { //handle when there are no clients joined for particular room id
        roomClients[room] = []; //it will create room with empty clients
      }

      if (roomClients[room].length < MAX_CLIENTS_PER_ROOM) {
        socket.join(room);  //adding the user to particular room
        roomClients[room].push(socket.id); //adding the user id to room
        
        console.log(`User ${socket.id} joined room ${room}`);
        var symbol = symbols[symbol_assigning_index];
        console.log(symbol);
        symbol_assigning_index = (symbol_assigning_index + 1) % 2;
        socket.emit("your_symbol", symbol);
        
      } else {
        socket.emit("room_full");
        console.log(`Room ${room} is full`);
      }
    });

  // socket.on("send_message", (data) => {
  //   var symbol = symbols[symbol_assigning_index];
  //   console.log(symbol);
  //   symbol_assigning_index = (symbol_assigning_index + 1) % 2;
  //   socket.emit("your_symbol", symbol);
  //   console.log(data);
  // });
  socket.on("disconnect", () => {
    // Remove the disconnected user from the roomClients array
    for (const room in roomClients) {
      roomClients[room] = roomClients[room].filter((id) => id !== socket.id);
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log("server is listening on port: " + PORT);
});
