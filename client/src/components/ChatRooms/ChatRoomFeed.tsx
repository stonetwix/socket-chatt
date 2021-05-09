import { Component, ContextType, CSSProperties } from 'react';
import { Comment, List } from 'antd';
import { ChattContext } from '../chatContext';
import { socket } from '../../socketUtils';
import { Room } from '../AddRoom/AddNewRoom';

interface Props {
  room: Room,
}
class ChatRoomFeed extends Component<Props> {

  context!: ContextType<typeof ChattContext>
  static contextType = ChattContext;
  
  componentDidMount = () => {
    socket.emit('joinRoom', this.props.room.name);
  }

  render() {
    return (
      <ChattContext.Consumer>
        {({ messages }) => {
          return(
            <div>
              <List 
                style={feedlist}
                dataSource={messages}
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