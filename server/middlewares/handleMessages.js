const moment = require('moment')

// Format the message before it sends back to the frontend
function formatMessage(user, room, msg) {
    return {
        user,
        room,
        msg,
        time:  moment().format('h:mm'),
    }
}

module.exports = { formatMessage }