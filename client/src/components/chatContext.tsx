import { Component, createContext } from 'react';
import { socket } from '../socketUtils';
import { Room } from './AddRoom/AddNewRoom';
import { ChatMessage } from './ChatRooms/ChatRoomFeed';

interface State {
    rooms: Room[],
    messages: ChatMessage[],
    username: string,
    currentRoomName: string,
}

interface ContextValue extends State {
    setUsername: (username: string) => void;
    setCurrentRoom: (currentRoomName: string) => void;
}

export const ChattContext = createContext<ContextValue>({
    rooms: [],
    messages: [],
    username: '',
    currentRoomName: '',
    setUsername: () => {},
    setCurrentRoom: () => {},
});
class ChattProvider extends Component<{}, State> {
    state: State = {
        rooms: [],
        messages: [],
        username: localStorage.getItem('username') as string,
        currentRoomName: '',
    }
 
    componentDidMount = () => {
        // Fetches the rooms from server
        socket.on('roomCreated', (event) => {
            console.log('Nytt rum: ', event);
            this.setState({ rooms: [...this.state.rooms, event] });
        })

        // Fetches the messenges from room
        socket.on('message', (event) => {
            
            console.log('Message: ', event);            
            this.setState({ messages: [...this.state.messages, event] });
        })

        socket.on('updateAllRooms', (event) => {
            console.log('Uppdated with active rooms: ', event);
            this.setState({ rooms: event });
        })
        
        // Fetches all the messenges from room
        socket.on('getAllMessages', (messages) => {
            console.log('All messages: ', messages);
            this.setState({ messages: messages });
        })

        socket.on('updateRooms', (event) => {
            console.log('Update rooms: ', event);
            this.setState({ rooms: [...this.state.rooms, event] });
        })

        socket.on('setRooms', (rooms) => {
            console.log('Set rooms: ', rooms);
            this.setState({ rooms: rooms });
        })

        // socket.on('leaveRoom', (rooms) => {
        //     this.setState({ rooms: rooms });
        // })

        socket.emit('getRooms', {})

        socket.on('authenticatedRoom', (result) => {
            if (result.error) {
                alert(result.error);
                return;
            }
            const rooms = this.state.rooms.map(
                (item: Room) => item.name === result.roomName ? {...item, isAuthenticated: true} : item
            );
            this.setState({ rooms: rooms });
        })
    }    

    setUsername = (username: string) => {
        localStorage.setItem('username', username);
        this.setState({ username: username });
    }

    setCurrentRoom = (currentRoomName: string) => {
        this.setState({ currentRoomName: currentRoomName });
    }

    render() {       
        return (
            <ChattContext.Provider value={{
                rooms: this.state.rooms,
                messages: this.state.messages,
                username: this.state.username,
                currentRoomName: this.state.currentRoomName,
                setUsername: this.setUsername,
                setCurrentRoom: this.setCurrentRoom,
            }}>
                {this.props.children}
            </ChattContext.Provider>
        );
    }
}

export default ChattProvider;