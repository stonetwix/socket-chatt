const moment = require('moment')

// Format the message before it sends back to the frontend
function formatMessage(user, msg) {
    return {
        user,
        msg,
        time:  moment().format('h:mm')
    }
}

module.exports = formatMessage