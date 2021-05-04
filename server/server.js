const express = require('express');
const http = require('http')
const { Server } = require("socket.io");

const formatMessage = require('./middlewares/handleMessages')

const app = express();
const port = 3001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

const bot = 'Woffle bot';

let state = {
    rooms: {},
}

io.on('connection', (socket) => {
    console.log("Client was connected:", socket.id);

    // Sends a welcome message to the connected user
    socket.emit('message', formatMessage(bot ,"Welcome to Woffle!"))

    //Sends back message to everyone that a new user has been connected
    socket.broadcast.emit('message', formatMessage(bot, 'A user has joined the Woffle'))

    // Handle the chat messaging from user inputs
    // When get the username and chatmessage:
    // formatMessage(msg.user, msg.msg)
    socket.on('chatMsg', (msg) => {
        io.emit('message', formatMessage('USER', msg))
    });

    socket.on('createRoom', (msg) => {
        const { room, user, isPrivate, password } = msg;
        state.rooms[room] = {
            user: user,
            isPrivate: isPrivate,
            password: password
        };
    })

    // This sends a message to the client that someone has been disconnected from the chatroom
    // Use leaving to write the disconnect-message
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(bot, 'User has left the chatroom!'))
    })
});


server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));