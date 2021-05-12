const express = require('express');
const http = require('http')
const { Server } = require("socket.io");
const bcrypt = require('bcrypt');

const { formatMessage } = require('./middlewares/handleMessages')

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
let rooms = [];
const messages = {};
const authenticatedSockets = {};
const socketUserMap = {};

io.on('connection', (socket) => {
    console.log("Client was connected:", socket.id);
    socket.emit('updateRooms', rooms);

    socket.on('joinRoom', (room) => {
        const authRooms = authenticatedSockets[socket.id] || [];
        if (room.isPrivate && !authRooms.find(roomName => room.name === roomName)) {
            return;
        }

        // Joins the room that the user clicked on
        socket.join(room.name);
        socket.emit('getAllMessages', messages[room.name] || []); 

        //Sends a message to everyone that a new user has been connected to the room
        const username = socketUserMap[socket.id];
        socket.broadcast.to(room.name).emit('message', formatMessage(bot, room.name, `${username} has joined Waffle!`))
        emitUsersInRooms([room.name]);
    });

    socket.on('getRooms', () => {
        socket.emit('setRooms', rooms);
    });

    // Handle the chat messaging from user inputs
    socket.on('chatMsg', (msg) => {
        io.to(msg.room).emit('message', formatMessage(msg.user, msg.room, msg.message))
        messages[msg.room].push(formatMessage(msg.user, msg.room, msg.message));
    });

    socket.on('createRoom', async (room) => {
        if (room.isPrivate) {
            room.password = await bcrypt.hash(room.password, 10);
        }
        rooms.push(room);
        messages[room.name] = [];
        io.emit('roomCreated', room);
    });

    socket.on('authenticate', async (roomName, password) => {
        const room = rooms.find(room => room.name === roomName);
        if (!await bcrypt.compare(password, room.password)) {
            socket.emit('authenticatedRoom', { roomName: roomName, error: 'Invalid password' });
            return;
        }
        authenticatedSockets[socket.id] = [...authenticatedSockets[socket.id] || [], room.name];
        socket.emit('authenticatedRoom', {roomName: roomName});
    });

    socket.on('addUser', (username) => {
        socketUserMap[socket.id] = username;
    });

    socket.on('isTyping', (isTyping, username, roomName) => {
        socket.broadcast.emit('typing', isTyping, username, roomName);
    });

    socket.on('disconnect', () => {
        const roomNames = rooms.map(r => r.name);
        const socketRoomNames = new Set(io.sockets.adapter.rooms.keys());
        const roomNamesToRemove = new Set([...roomNames].filter((x) => !socketRoomNames.has(x)));
        rooms = rooms.filter(r => !roomNamesToRemove.has(r.name));
        io.emit('setRooms', rooms);

        emitUsersInRooms([...roomNames]);
    })
});

const emitUsersInRooms = (roomNames) => {
    for (const roomName of roomNames) {
        const socketsInRoom = new Set(io.sockets.adapter.rooms.get(roomName));
        const usersInRoom = [...socketsInRoom].map(s => socketUserMap[s]);
        io.emit('usersInRoom', usersInRoom, roomName);
    }
}

server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));