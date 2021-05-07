import { io } from "socket.io-client";
import { Room } from "./components/AddRoom/AddNewRoom";
const endpoint = "http://localhost:3001";
export const socket = io(endpoint);

// Sends the chat-value to server
export function sendMessage(user: string, roomName: string, msg: any) {

    const message = {
        user: user,
        room: roomName,
        message: msg
    }
    socket.emit('chatMsg', message);
    socket.emit('typing', message)
}

export function createRoom(room: Room) {
    socket.emit('createRoom', room);
    socket.emit('joinRoom', room.name) 
}

export function joinRoom(room: Room) {
    socket.emit('joinRoom', room.name)   
}

export function updateRoom(room: Room) {
    socket.emit('updateRoom', room);
}

export function addUsername(username: any) {
    socket.emit('addUser', username)
}

