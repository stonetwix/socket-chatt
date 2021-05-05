import { Component, createContext } from 'react';
import { socket } from '../socketUtils';

interface State {
    rooms: string[],
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
            this.setState({ rooms: [...this.state.rooms, event.room] });
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