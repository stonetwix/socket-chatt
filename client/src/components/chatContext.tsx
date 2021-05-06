import { Component, createContext } from 'react';
import { socket } from '../socketUtils';
import { Room } from './AddRoom/AddNewRoom';

interface State {
    rooms: Room[],
    messages: string[],
}

interface ContextValue extends State {

}

export const ChattContext = createContext<ContextValue>({
    rooms: [],
    messages: [],
});
class ChattProvider extends Component<{}, State> {
    state: State = {
        rooms: [],
        messages: []
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
    }    

    render() {       
        return (
            <ChattContext.Provider value={{
                rooms: this.state.rooms,
                messages: this.state.messages
            }}>
                {this.props.children}
            </ChattContext.Provider>
        );
    }
}

export default ChattProvider;