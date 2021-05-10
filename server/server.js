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
const authenticatedSockets = {};

io.on('connection', (socket) => {
    console.log("Client was connected:", socket.id);
    socket.emit('updateRooms', rooms);
    

    socket.on('joinRoom', (room) => {
        getAllRooms();
        const authRooms = authenticatedSockets[socket.id] || [];
        if (room.isPrivate && !authRooms.find(roomName => room.name === roomName)) {
            console.log('Not authenticated');
            return;
        }
        console.log('Join room: ', room)

        // Joins the room that the user clicked on
        socket.join(room.name);

        // // Sends a welcome message to the connected user
        //const message = formatMessage(bot, room.name,`Hi ${username} Welcome to Waffle!`);
        socket.emit('getAllMessages', messages[room.name] || []); 

        // //Sends a message to everyone that a new user has been connected to the room
        socket.broadcast.to(room.name).emit('message', formatMessage(bot, room.name, `${username} has joined Waffle!`))
    });

    socket.on('getRooms', () => {
        console.log('Get rooms: ', rooms)
        socket.emit('setRooms', rooms);
    });

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

    socket.on('authenticate', async (roomName, password) => {
        const room = rooms.find(room => room.name === roomName);
        console.log('authenticate: ', room);
        if (!await bcrypt.compare(password, room.password)) {
            socket.emit('authenticatedRoom', { roomName: roomName, error: 'Invalid password' });
            console.log('invalid password');
            return;
        }
        authenticatedSockets[socket.id] = [...authenticatedSockets[socket.id] || [], room.name];
        console.log('auth socket: ', authenticatedSockets);
        socket.emit('authenticatedRoom', {roomName: roomName});
    });

    function getAllRooms() {
        const roomsAndSockets = io.sockets.adapter.rooms.keys();
    
        const existingRooms = [];
        for(const room of roomsAndSockets) {
            if (room.length <= 18) {
                console.log({DavidsKodRoom: room})
                existingRooms.push(room);                
            } else {
                console.log({DavidsKodSockets: room})
            }
        }
        
        
    
        cleanUpOldRoomData(existingRooms)
    
        return existingRooms // [{ name: 'a', isPrivate: false }, 'b']
    }

    function cleanUpOldRoomData(existingRooms) {
        console.log({DavidsKodAllaRum: existingRooms})
        console.log({ALLAVÅRARUM: rooms})
        const roomsToDelete = []
        rooms.forEach(room => {
            if (!existingRooms.some(existingRoom => existingRoom === room.name)) {
                roomsToDelete.push(room)
            }
        })
        // roomsToDelete.forEach((room) => {
        //     const index = rooms.indexOf(room);
        //     rooms.splice(index, 1);
        // })
        console.log({DavidsKod: roomsToDelete})
    }

    socket.on('addUser', (username) => {
        io.emit('message', username)
            console.log(username)
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

server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));