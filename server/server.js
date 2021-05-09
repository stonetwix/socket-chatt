const express = require('express');
const http = require('http')
const { Server } = require("socket.io");
const bcrypt = require('bcrypt');

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


// room can be used in filter the user on a server
const rooms = [];
const messages = {};
const username = '';

io.on('connection', (socket) => {
    console.log("Client was connected:", socket.id);
    socket.emit('updateRooms', rooms);

    socket.on('joinRoom', (roomName) => {

        // Joins the room that the user clicked on
        socket.join(roomName);

        // // Sends a welcome message to the connected user
        //const message = formatMessage(bot, room.name,`Hi ${username} Welcome to Waffle!`);
        socket.emit('getAllMessages', messages[roomName] || []); 

        // //Sends a message to everyone that a new user has been connected to the room
        socket.broadcast.to(roomName).emit('message', formatMessage(bot, roomName, `${username} has joined Waffle!`))
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
        console.log(msg);
        messages[msg.room].push(formatMessage(msg.user, msg.room, msg.message));
        console.log('chat', messages);
    });

    socket.on('createRoom', async (room) => {
        console.log(room);
        if (room.isPrivate) {
            room.password = await bcrypt.hash(room.password, 10);
        }
        rooms.push(room);
        messages[room.name] = [];
        io.emit('roomCreated', room);
    });

    socket.on('checkPassword', (room) => {

    })

    socket.on('addUser', (username) => {
        io.emit('message', username)
            console.log(username)
    })

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