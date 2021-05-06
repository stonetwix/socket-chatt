const moment = require('moment')

const users = []

const messenges = []

// Saves the user to an array
function saveUser(room, id) {

    const user = {
        id: id,
        user: "nicklas",
        room: room.name,
    }

    // Pushes the clientinformation to the users variable
    users.push(user)

    return user
}

// Format the message before it sends back to the frontend
function formatMessage(user, room, msg) {

    messenges.push({
        user:user,
        room:room,
        msg: msg,
        time:  moment().format('h:mm'),
    })

    return {
        user,
        room,
        msg,
        time:  moment().format('h:mm'),
    }
}

function sendMessages() {
    return messenges
}

// Verify the user
function getUser(id) {
    console.log(users)
    return users.find(user => user.id === id);
}

module.exports = { formatMessage, getUser, saveUser, sendMessages }