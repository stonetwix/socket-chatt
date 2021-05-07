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

    socket.on('joinRoom', (room, user) => {
        console.log(room)
        console.log(user)

        //Sets the users information to handleMessages from the client
        const userToSave = saveUser(room, socket.id, user)

        // Pushes the room and user to the room array
        rooms.push({
            room: room.name,
            user: user
        })

        // Joins the room that the user clicked on
        socket.join(room.name);   

        // Sends a welcome message to the connected user
        socket.emit('message', formatMessage(bot, room.name ,`Hi ${user}! Welcome to Woffle!`))

        //Sends a message to everyone that a new user has been connected to the room
        socket.broadcast.to(room.name).emit('message', formatMessage(bot, room.name , `${user} has joined Woffle!`))    
    })

    // Handle the chat messaging from user inputs
    // When get the username and chatmessage:
    // formatMessage(msg.user, msg.msg)
    socket.on('chatMsg', (msg) => {

        const user = getUser(socket.id)
        console.log({user: user})
        console.log({msg: msg})

        // If the user is true, send the chat message to specific room
        if(user) {
            io.to(msg.room).emit('message', formatMessage(msg.user, msg.room, msg.message))
        }
    });

    socket.on('createRoom', (room) => {
        socket.join(room.name);
        io.emit('roomCreated', room);
    });

    socket.on('addUser', (username) => {
        io.emit('message', formatMessage(username))
                console.log(username)
    })
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