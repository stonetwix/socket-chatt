import { Component, ContextType, CSSProperties } from 'react';
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import { ChattContext } from '../chatContext';

class ChatRoomFeed extends Component {

  context!: ContextType<typeof ChattContext>
  static contextType = ChattContext;

  render() {
    return (
      <ChattContext.Consumer>

        {({ messenges }) => {
          return(
      <div>
        <List 
          style={feedlist}
          dataSource={messenges}
          renderItem={(item: any) => (
            <Comment
              author={item.user}
              // avatar={item.avatar}
              content={item.msg}
              // datetime={item.datetime}
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