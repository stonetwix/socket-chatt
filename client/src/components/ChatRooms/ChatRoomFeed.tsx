import { Component, ContextType, CSSProperties } from 'react';
import { Comment, List } from 'antd';
import { ChattContext } from '../chatContext';
import { socket } from '../../socketUtils';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

interface Props extends RouteComponentProps {
  location: any
}
class ChatRoomFeed extends Component<Props> {

  context!: ContextType<typeof ChattContext>
  static contextType = ChattContext;

  static propTypes = {
    location: PropTypes.object.isRequired
  }
  
  componentDidMount = () => {
    const { location } = this.props;
    const roomName = location.pathname.split('/').slice(-1).pop();
    socket.emit('joinRoom', roomName); // byt ut test till url:en för rummet.
    console.log(location)
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

export default withRouter(ChatRoomFeed);

const feedlist: CSSProperties = {
    display: "flex",
    margin: "auto",
    width: "100%"
  };