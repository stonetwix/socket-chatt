import { io } from "socket.io-client";
const endpoint = "http://localhost:3001";
export const socket = io(endpoint);

export function sendMessage(msg: any) {
    socket.emit('chatMsg', msg);
    console.log('knapp tryck')
    console.log(msg)
}



