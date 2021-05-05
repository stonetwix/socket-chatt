import { io } from "socket.io-client";
import { Room } from "./components/AddRoom/AddNewRoom";
const endpoint = "http://localhost:3001";
export const socket = io(endpoint);

// Sends the chat-value to server
export function sendMessage(msg: any) {

    socket.emit('chatMsg', msg);
}

export function createRoom(room: Room) {
    socket.emit('createRoom', room);
}

export function addUsername(username: any) {
    socket.emit('addUser', username)

}
