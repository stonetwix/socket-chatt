const express = require('express');
const http = require('http')
const { Server } = require("socket.io");

const { formatMessage, getUser, saveUser } = require('./middlewares/handleMessages')

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

// room can be used in filter the user on a server
const rooms = []

io.on('connection', (socket) => {
    console.log("Client was connected:", socket.id);

    socket.on('joinRoom', (msg) => {

        // Sets the users information to handleMessages from the client
        const user = saveUser(msg, socket.id)

        // Pushes the room and user to the room array
        rooms.push({
            room: user.room,
            user: user.user
        })

        // Joins the room that the user clicked on
        socket.join(user.room);   

        // Sends a welcome message to the connected user
        socket.emit('message', formatMessage(bot, user.room ,`Hi ${user.user}! Welcome to Woffle!`))

        //Sends a message to everyone that a new user has been connected to the room
        socket.broadcast.to(user.room).emit('message', formatMessage(bot, user.room , `${user.user} has left Woffle!`))    
    })

    // Handle the chat messaging from user inputs
    // When get the username and chatmessage:
    // formatMessage(msg.user, msg.msg)
    socket.on('chatMsg', (msg) => {

        const user = getUser(socket.id)

        // If the user is true, send the chat message to specific room
        if(user) {
            io.to(msg.room).emit('message', formatMessage(msg.user, msg.room, msg.message))
        }
    });

    socket.on('createRoom', (room) => {
        socket.join(room.name);
        console.log(room);
        io.emit('roomCreated', room);
    });

    // This sends a message to the client that someone has been disconnected from the chatroom
    // Use leaving to write the disconnect-message
    socket.on('disconnect', () => {
        const user = getUser(socket.id)

        if(user) {
            io.emit('message', formatMessage(bot, user.room, `${user.user} has left the room`))
        }
    })
});


server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));