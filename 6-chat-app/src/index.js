const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }) => {
    socket.join(room);

    socket.emit("message", generateMessage("Welcome!"));

    //emit the event to everyone in the room except de broadcaster
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined.`));
  });

  socket.on("sendMessage", (message, callback) => {
    //checking bad words in message
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }

    //emit the event to every single connection currently avaible
    io.to("Central").emit("message", generateMessage(message));
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit("locationMessage", generateLocationMessage(coords));

    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage(`User has left`));
  });
});

server.listen(port);
