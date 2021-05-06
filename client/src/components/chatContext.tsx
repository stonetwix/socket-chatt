import { Component, createContext } from 'react';
import { socket } from '../socketUtils';
import { Room } from './AddRoom/AddNewRoom';

interface State {
    rooms: Room[],
    messenges: string[],
    usernames: string[],
}

interface ContextValue extends State {

}

export const ChattContext = createContext<ContextValue>({
    rooms: [],
    messenges: [],
    usernames: [],
});
class ChattProvider extends Component<{}, State> {
    state: State = {
        rooms: [],
        messenges: [],
        usernames: [],
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

        // Fetches the usernames
        socket.on('addUser', (event) => {
            console.log('Username: ', event);
            this.setState({ usernames: [...this.state.usernames, event] });
        })
    }    

    render() {
        
        return (
            <ChattContext.Provider value={{
                rooms: this.state.rooms,
                messenges: this.state.messenges,
                usernames: this.state.usernames,
            }}>
                                {this.props.children}
            </ChattContext.Provider>
        );
    }
}

export default ChattProvider;