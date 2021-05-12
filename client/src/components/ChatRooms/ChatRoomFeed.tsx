import { Component, ContextType, CSSProperties } from 'react';
import { Comment, List } from 'antd';
import { ChattContext } from '../chatContext';
import { socket } from '../../socketUtils';
import { Room } from '../AddRoom/AddNewRoom';

interface Props {
  room: Room,
}
export interface ChatMessage {
  msg: string,
  user: string,
  time: string,
  roomName: string,
}
class ChatRoomFeed extends Component<Props> {
  context!: ContextType<typeof ChattContext>
  static contextType = ChattContext;
  
  componentDidMount = () => {
    socket.emit('joinRoom', this.props.room);
    console.log('join room', this.props.room)
  }

  usersInRoomString = () => {
    const { usersInRoom } = this.context;
    const users = usersInRoom[this.props.room.name] || [];
    return users.join(', ');
  }

  render() {
    return (
      <ChattContext.Consumer>
        {({ messages }) => {
          return(
            <>
              <div style={activeUsers}>
                <p style={{padding: '0.8rem 1rem'}}>Active users: {this.usersInRoomString()} </p>
              </div>
              <div style={containerStyle}>
                <List 
                  style={feedlist}
                  dataSource={messages.filter((msg: any) => msg.room === this.props.room.name)}
                  renderItem={(item: any) => (
                    <Comment
                      author={item.user}
                      // avatar={item.avatar}
                      content={item.msg}
                      datetime={item.time}
                    />
                  )}
                />
              </div>
            </>
          )
        }}
      </ChattContext.Consumer>
    ) 
  }
}

export default ChatRoomFeed;

const feedlist: CSSProperties = {
  display: "flex",
  margin: "auto",
  width: "100%"
};

const containerStyle: CSSProperties = {
  maxHeight: '35rem',
  overflow: 'auto'
}

const activeUsers: CSSProperties = {
  height: '3rem',
  background: '#eee',
  marginBottom: '2rem',
  marginTop: '-2rem'
}