import { io } from "socket.io-client";
const endpoint = "http://localhost:3001";
export const socket = io(endpoint);

export function sendMessage(msg: any) {
    socket.emit('chat message', 'hej');
}

