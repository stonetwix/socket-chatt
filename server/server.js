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
          
        const authRooms = authenticatedSockets[socket.id] || [];
        if (room.isPrivate && !authRooms.find(roomName => room.name === roomName)) {
            console.log('Not authenticated');
            return;
        }
        console.log('Join room: ', room)

        // Joins the room that the user clicked on
        socket.join(room.name);
        getAllRooms();

        // // Sends a welcome message to the connected user
        //const message = formatMessage(bot, room.name,`Hi ${username} Welcome to Waffle!`);
        socket.emit('getAllMessages', messages[room.name] || []); 

        // //Sends a message to everyone that a new user has been connected to the room
        socket.broadcast.to(room.name).emit('message', formatMessage(bot, room.name, `${username} has joined Waffle!`))
    });



    socket.on('getRooms', () => {
        console.log('Get rooms: ', rooms)
        socket.emit('setRooms', rooms);
        getAllRooms()
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

    
    socket.on('leaveRoom', (room) => {
        //
        // TODO: Jag behöver komma åt det gamla rum värdet för att kunna lämna rummet. 
        // TODO: Fungerar men måste ha rummet
        //
        socket.leave('Salen')
        getAllRooms()
        // console.log({LämnatRum: room.name})
        // socket.leave(room.name)
    })

    function getAllRooms() {
        const roomsAndSockets = io.sockets.adapter.rooms.keys();
        // console.log({DavidsKodRoom: roomsAndSockets})
        let existingRooms = []

        // existingRooms = []
                
        for(const room of roomsAndSockets) {
            
            if (room.length <= 18) {
                // console.log({DavidsKodRoom: room})
                
                if(room === existingRooms) {
                    // console.log({ROOM: room})
                    return
                } else {
                    // console.log({ROOM: room})
                    
                    // console.log({Push: room})
                    existingRooms.push(room); 
                    // console.log({EXISTROOM: existingRooms})
                }
            } else {
                // console.log({DavidsKodSockets: room})
            }
        }      
        
        cleanUpOldRoomData(existingRooms)
    
        return existingRooms // [{ name: 'a', isPrivate: false }, 'b']
    }

    function cleanUpOldRoomData(existingRooms) {
        let roomIndex;
        console.log({DavidsKodAllaRum: existingRooms})
        // console.log({ALLAVÅRARUM: rooms})
        let roomsToDelete = []
        rooms.forEach(room => {
            if (!existingRooms.some(existingRoom => existingRoom === room.name)) {
                roomsToDelete.push(room)
                console.log({RUMFINNS: existingRooms})
            } else {
                return
            }
        })
        if (roomsToDelete === [] ) {
            return
        } else {
            roomsToDelete.forEach((room) => {
                console.log({RummetFöre: rooms})
                const index = rooms.indexOf(room);
                // console.log({Index: index})
                rooms.splice(index, 1);
                
                // TODO: Uppdatera listan efter detta kört!
                socket.emit('updateRooms', rooms);
                //roomIndex = index
                console.log({RummetEfter: rooms})
            })
        }

        
        
        // console.log({DavidsKod: roomsToDelete})
    }

    socket.on('addUser', (username) => {
        io.emit('message', username)
            console.log(username)
    });

    // This sends a message to the client that someone has been disconnected from the chatroom
    // Use leaving to write the disconnect-message
    socket.on('disconnect', () => {
        getAllRooms();
        socket.emit('updateRooms', rooms);
            io.emit('message', 'user has left')        
    })
});

server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));