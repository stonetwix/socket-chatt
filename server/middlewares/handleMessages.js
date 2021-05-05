const moment = require('moment')

const users = []

// Saves the user to an array
function saveUser(msg, id) {

    const user = {
        id: id,
        user: msg.user,
        room: msg.room,
        msg: msg.message
    }

    // Pushes the clientinformation to the users variable
    users.push(user)

    return user
}

// Format the message before it sends back to the frontend
function formatMessage(user, room, msg) {
    return {
        user,
        room,
        msg,
        time:  moment().format('h:mm'),
    }
}

// Verify the user
function getUser(id) {
    console.log(users)
    return users.find(user => user.id === id);
}

module.exports = { formatMessage, getUser, saveUser }