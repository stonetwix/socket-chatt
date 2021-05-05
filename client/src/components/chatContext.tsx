import { Component, createContext } from 'react';
import { socket } from '../socketUtils';
import { Room } from './AddRoom/AddNewRoom';

interface State {
    rooms: Room[],
}

interface ContextValue extends State {

}

export const ChattContext = createContext<ContextValue>({
    rooms: [],
});

class ChattProvider extends Component<{}, State> {
    state: State = {
        rooms: [],
    }

    componentDidMount = () => {
        socket.on('roomCreated', (event) => {
            console.log('Nytt rum: ', event);
            this.setState({ rooms: [...this.state.rooms, event] });
        })
    }

    render() {
        return (
            <ChattContext.Provider value={{
                rooms: this.state.rooms,
            }}>
                {this.props.children}
            </ChattContext.Provider>
        );
    }
}

export default ChattProvider;