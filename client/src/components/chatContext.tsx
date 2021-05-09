import { Component, createContext } from 'react';
import { socket } from '../socketUtils';
import { Room } from './AddRoom/AddNewRoom';

interface State {
    rooms: Room[],
    messages: string[],
    username: string,
}

interface ContextValue extends State {
    setUsername: (username: string) => void;
}

export const ChattContext = createContext<ContextValue>({
    rooms: [],
    messages: [],
    username: '',
    setUsername: () => {},
});
class ChattProvider extends Component<{}, State> {
    state: State = {
        rooms: [],
        messages: [],
        username: '',
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

        socket.emit('getRooms', {})

        socket.on('authenticatedRoom', (result) => {
            //console.log(result.error)
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
        this.setState({ username: username });
    }

    render() {       
        return (
            <ChattContext.Provider value={{
                rooms: this.state.rooms,
                messages: this.state.messages,
                username: this.state.username,
                setUsername: this.setUsername,
            }}>
                {this.props.children}
            </ChattContext.Provider>
        );
    }
}

export default ChattProvider;