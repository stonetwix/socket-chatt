import { io } from "socket.io-client";
const endpoint = "http://localhost:3001";
export const socket = io(endpoint);

// Sends the chat-value to server
export function sendMessage(msg: any) {
    socket.emit('chatMsg', msg);
}

export function createRoom(room: any) {
    socket.emit('createRoom', room);
}
