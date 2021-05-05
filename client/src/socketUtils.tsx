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
}

export function createRoom(room: Room) {
    socket.emit('createRoom', room);
}




