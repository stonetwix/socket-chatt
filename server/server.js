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

const bot = 'Waffle bot';

let state = {
    rooms: {},
}

// room can be used in filter the user on a server
const rooms = [];
const messages = {};

io.on('connection', (socket) => {
    console.log("Client was connected:", socket.id);
    socket.emit('updateRooms', rooms);

    socket.on('joinRoom', (room) => {

        // // Sets the users information to handleMessages from the client
        // const user = saveUser(room, socket.id)

        // // Pushes the room and user to the room array
        // rooms.push({
        //     room: user.room
        // })

        // // Joins the room that the user clicked on
        //socket.join(room);   

        // // Sends a welcome message to the connected user
         //socket.emit('message', formatMessage(bot, user.room ,`Hi ${user.user}! Welcome to Waffle!`))

        // //Sends a message to everyone that a new user has been connected to the room
        //socket.broadcast.to(user.room).emit('message', formatMessage(bot, user.room , `${user.user} has joined Waffle!`))
    })
    socket.on('getRooms', () => {
        console.log('Get rooms: ', rooms)
        socket.emit('setRooms', rooms);
    })

    // Handle the chat messaging from user inputs
    // When get the username and chatmessage:
    // formatMessage(msg.user, msg.msg)
    socket.on('chatMsg', (msg) => {
        //const user = getUser(socket.id)

        // If the user is true, send the chat message to specific room
        io.to(msg.room).emit('message', formatMessage(msg.user, msg.room, msg.message))
        if(user) {
        }
        console.log(msg.room);
        messages[msg.room].push(formatMessage(msg.user, msg.room, msg.message));
        console.log('chat', messages);
    });

    socket.on('createRoom', (room) => {
        socket.join(room.name);
        console.log(room);
        rooms.push(room);
        messages[room.name] = [];
        io.emit('roomCreated', room);
    });

    // This sends a message to the client that someone has been disconnected from the chatroom
    // Use leaving to write the disconnect-message
    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        if (user) {
            io.emit('message', formatMessage(bot, user.room, `${user.user} has left the room`))
        }
    })
});

function getExistingRooms() {
    const sockets = Object.values(io.sockets.sockets);
    let rooms = [];
    for (const socket of sockets) {
        const existingRooms = Object.keys(socket.rooms).filter(room => room === socket.id);
        rooms.push(...existingRooms);
    }
    console.log(rooms);
    return [...new Set(rooms)];
}

server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));