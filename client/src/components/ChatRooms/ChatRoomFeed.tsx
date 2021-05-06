import { Component, ContextType, CSSProperties } from 'react';
import { Comment, List } from 'antd';
import { ChattContext } from '../chatContext';

class ChatRoomFeed extends Component {

  context!: ContextType<typeof ChattContext>
  static contextType = ChattContext;

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