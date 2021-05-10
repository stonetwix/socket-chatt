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


// room can be used in filter the user on a server
const rooms = [];
const messages = {};



io.on('connection', (socket) => {
    console.log("Client was connected:", socket.id);
    socket.emit('updateRooms', rooms);
    getAllRooms();

    socket.on('joinRoom', (roomName, user) => {

        
        // console.log({rooms: roomName})
        // console.log({username: user})
        // checkUser(socket.id)

        // // Sets the users information to handleMessages from the client
        // const user = saveUser(room, socket.id)

        // // Pushes the room and user to the room array
        // rooms.push({
        //     room: user.room
        // })

        // Joins the room that the user clicked on
        socket.join(roomName);

        

        // // Sends a welcome message to the connected user
        //const message = formatMessage(bot, room.name,`Hi ${username} Welcome to Waffle!`);
        socket.emit('getAllMessages', messages[roomName] || []); 

        // //Sends a message to everyone that a new user has been connected to the room
        socket.broadcast.to(roomName).emit('message', formatMessage(bot, roomName, `${user} has joined Waffle!`))

        
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

    socket.on('createRoom', (room) => {
        //socket.join(room.name);
        console.log(room);
        rooms.push(room);
        messages[room.name] = [];
        io.emit('roomCreated', room);
    });

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

function getAllRooms() {
    const roomsAndSockets = io.sockets.adapter.rooms.keys();

    const existingRooms = [];
    for(const room of roomsAndSockets) {
        if (room.length <= 18) {
            existingRooms.push(room);
        }
    }

    cleanUpOldRoomData(existingRooms)

    return existingRooms // [{ name: 'a', isPrivate: false }, 'b']
}

function cleanUpOldRoomData(existingRooms) {
    const roomsToDelete = []
    rooms.forEach(room => {
        if (!existingRooms.some(existingRoom => existingRoom === room.name)) {
            roomsToDelete.push(room)
        }
    })
    roomsToDelete.forEach((room) => {
        const index = rooms.indexOf(room);
        rooms.splice(index, 1);
    })
}

function checkUser(id) {
    console.log('whoot')
    
    let roomsTest = [
        {room: 'Salen'},
        {room: 'Test1'},
        {room: 'Test2'}
    ]

    console.log({Massarum: roomsTest})

    let userInRoom = [{
        user: 'nicklas',
        room: 'Salen'
    },
    {
        user: 'dante',
        room: "Test2"
    }]


    let noRoom = nedu()

    function nedu(){
        const isRoom = []
        const userRoom = []
        for(room of roomsTest) {
            // console.log({testar:room.room})
            isRoom.push(room.room)           
        }

        for(user of userInRoom) {
            // console.log({testarUser: user.room})
            userRoom.push(user.room)
        }        

        console.log(isRoom)
        console.log(userRoom)

        for(i = 0; isRoom.length; i++){

            for(j = 0; userRoom.length; i++){

                if(isRoom[i] === userRoom[j]) {
                    console.log({HittaRummet: userRoom})
                    roomsTest=userRoom
                } return
            }
        }
        
    }
    console.log({NuJävlar: roomsTest})

    function hej() {

        for(i = 0; i < roomsTest.length; i++) {
            let room = roomsTest[i].room
            for(a = 0; a < userInRoom.length; a++){
                let userRoom = userInRoom[a].room
                if(userRoom === room) {
                    console.log(room)
                } else {
                    if(roomsTest.room === room) {
                        console.log(room)
                        return
                    } else {
                        console.log({felRum: room})
                        let findRoom = roomsTest.filter((roomy) => {
                            return roomy.room !== room;
                        })

                        function isRoom(roomsTest) {
                            return roomsTest.room === room[0].room
                        }
                        console.log()
                        const isARoom = roomsTest.findIndex(isRoom)
                        roomsTest.splice(isARoom, 1)
                        return findRoom
                    }
                }
            }
        }
    }
         

   
    // console.log(roomTest[1].room)

    
    // console.log({nuvarande: roomsTest})   


}

server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));