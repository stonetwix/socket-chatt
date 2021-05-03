const express = require('express');
const http = require('http')
const mongoose = require('mongoose');
const { Server } = require("socket.io");

const app = express();
const port = 3001;

const server = http.createServer(app);
const io = new Server(server)

io.on('connection', (socket) => {

    // Sends back the message to app for everyone to see
    // When this is been fetch on the client, use it like a variable.
    // If it is a object write variable.user or what value you would like to get
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

    // Send back message to everyone besides the author
    // io.on('connection', (socket) => {
    //     socket.on('chat message', (msg) => {
    //     socket.broadcast.emit('chat message', msg);
    //     });
    // });

    // Send back the message just to the author
    // io.on('connection', (socket) => {
    //     socket.on('chat message', (msg) => {
    //       socket.emit('chat message', msg);
    //     });
    // });

    // This sends a message to the client that someone has been connected or disconnected to the chatroom
    // Use arrive to write the connect-message
    io.emit('arrive', 'New user has been connected!');

    // This sends a message to the client that someone has been disconnected from the chatroom
    // Use leaving to write the disconnect-message
    socket.on('disconnect', () => {
        socket.broadcast.emit('leaving', 'User has left the chatroom!');
    })
});

async function run() {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/chat', 
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log('Database is connected');
    } catch (error) {
        console.error(error)
    }
    app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));
}
run();