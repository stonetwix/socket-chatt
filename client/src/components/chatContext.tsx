import { Component, createContext } from 'react';
import { socket } from '../socketUtils';
import { Room } from './AddRoom/AddNewRoom';

interface State {
    rooms: Room[],
    messenges: string[],
}

interface ContextValue extends State {

}

export const ChattContext = createContext<ContextValue>({
    rooms: [],
    messenges: [],
});
class ChattProvider extends Component<{}, State> {
    state: State = {
        rooms: [],
        messenges: []
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
            this.setState({ messenges: [...this.state.messenges, event] });
        })
        
        socket.on('updateRoom', (event) => {
            console.log('Update rooms: ', event);
            this.setState({ rooms: [...this.state.rooms, event] });
        })
    }    

    render() {
        
        return (
            <ChattContext.Provider value={{
                rooms: this.state.rooms,
                messenges: this.state.messenges
            }}>
                                {this.props.children}
            </ChattContext.Provider>
        );
    }
}

export default ChattProvider;