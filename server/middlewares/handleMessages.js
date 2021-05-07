const moment = require('moment')

const users = []

// Saves the user to an array
function saveUser(room, username, id) {
console.log({saveUser: username})
    const user = {
        id: id,
        user: username,
        room: room.room,
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
    return users.find(user => user.id === id);
}

module.exports = { formatMessage, getUser, saveUser }