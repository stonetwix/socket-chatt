import { io } from "socket.io-client";
import { Room } from "./components/AddRoom/AddNewRoom";
const endpoint = "http://localhost:3001";
export const socket = io(endpoint);

// Sends the chat-value to server
export function sendMessage(msg: any) {

    const message = {
        user: "Nicklas",
        room: "Skolbänken",
        message: msg
    }
    
    socket.emit('chatMsg', message);
    socket.emit('typing', message)
}

export function createRoom(room: Room) {
    socket.emit('createRoom', room);
    socket.emit('joinRoom', room) 
}

export function addUsername(username: any) {
    socket.emit('addUser', username)

}
