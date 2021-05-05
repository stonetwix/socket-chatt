import { Component, createContext } from 'react';
import { socket } from '../socketUtils';

interface State {
    rooms: string[],
    messenges: string[],
}

interface ContextValue extends State {

}

export const ChattContext = createContext<ContextValue>({
    rooms: [],
    messenges: [],
});

// socket.on('messages', (e) => {
//     console.log(e)
// });

class ChattProvider extends Component<{}, State> {
    state: State = {
        rooms: [],
        messenges: []
    }


 
    componentDidMount = () => {
        socket.on('roomCreated', (event) => {
            console.log('Nytt rum: ', event);
            this.setState({ rooms: [...this.state.rooms, event.room] });
        })
        socket.on('message', (event) => {
            console.log('Message: ', event);
            this.setState({ messenges: [...this.state.messenges, event] });
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

function messenges(messenges: any) {
    throw new Error('Function not implemented.');
}
