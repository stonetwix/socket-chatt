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
}

export function createRoom(room: Room) {
    socket.emit('createRoom', room);
    socket.emit('joinRoom', room);
}

export function joinRoom(room: Room) {
    socket.emit('leaveRoom', room)
    socket.emit('joinRoom', room);
}

export function updateRoom(room: Room) {
    socket.emit('updateRoom', room);
}

export function authenticate(room: Room, password: string) {
    socket.emit('authenticate', room.name, password);
}

// export function addUsername(username: string) {
//     socket.emit('addUser', username);
// }

