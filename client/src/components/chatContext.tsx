import { Component, createContext } from 'react';
import { socket } from '../socketUtils';
import { Room } from './AddRoom/AddNewRoom';

interface State {
    rooms: Room[],
    messenges: Messenges[],
    sortMessenges:Messenges[]
}

interface Messenges {
    user: string,
    room: string,
    msg: string,
    time: string
}
interface ContextValue extends State {

}

export const ChattContext = createContext<ContextValue>({
    rooms: [],
    messenges: [],
    sortMessenges:[]
});

class ChattProvider extends Component<{}, State> {
    state: State = {
        rooms: [],
        messenges:[],
        sortMessenges:[]
    }
 
    componentDidMount = () => {
        // Fetches the rooms from server
        socket.on('roomCreated', (event) => {
            console.log('Nytt rum: ', event);
            
            this.setState({ rooms: [...this.state.rooms, event] });
        })

        // Fetches the messenges from room
        socket.on('message', (event) => {
        
            this.setState({ messenges: [...this.state.messenges, event] });
            
            // Filters the incoming messenges to the room user choose to chat in
            const roomChat = this.state.messenges.filter((room:any) => {
                return room.room === 'Skolbänken'
            })

            // Sets the filterd list to sortMessenges that uses in ChatRoomFeed
            this.setState({ sortMessenges: roomChat });
        })
    }    

    render() {
        
        return (
            <ChattContext.Provider value={{
                rooms: this.state.rooms,
                messenges: this.state.messenges,
                sortMessenges: this.state.sortMessenges
            }}>
                                {this.props.children}
            </ChattContext.Provider>
        );
    }
}

export default ChattProvider;
