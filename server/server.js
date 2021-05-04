const express = require('express');
const http = require('http')
const mongoose = require('mongoose');
const { Server } = require("socket.io");

const formatMessage = require('./middlewares/handleMessages')

const app = express();
const port = 3001;

const server = http.createServer(app);
const io = new Server(server)

const bot = 'Woffle bot'

io.on('connection', (socket) => {

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

    // This sends a message to the client that someone has been disconnected from the chatroom
    // Use leaving to write the disconnect-message
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(bot, 'User has left the chatroom!'))
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