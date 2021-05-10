import { Input, Button, Form } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { sendMessage, socket } from '../../socketUtils';
import { ChattContext } from '../chatContext';
import { Room } from '../AddRoom/AddNewRoom';

const { TextArea } = Input;

interface Props {
  room: Room,
}

interface State {
  msg: string;
  isTyping: boolean;
}

class ReplyMessage extends Component<Props, State> {
  context!: ContextType<typeof ChattContext>
  static contextType = ChattContext;

  state: State = {
    msg: '',
    isTyping: false,
  };

  timeOut = () => {
    socket.emit('No longer typing');
  }

  // Handle the input onchange
  handleMsgChange = (e: any) => {
    const { username } = this.context;
    if (!this.state.msg) {
      console.log('Start typing');
      socket.emit('isTyping', true, username, this.props.room.name);
    }
    this.setState({msg: e.target.value})
    
  }

  handleKeyPress = (e: any) => {
    console.log(e)
    if (e.charCode === 92) {
      console.log('You pressed backslash');
      e.preventDefault();
    }
  }

  // This function sends back the input value to the sever
  // The input value will also be reset
  sendMsg = () => {
    const { username } = this.context;
     // A function that is imported from socketUtils
    sendMessage(username, this.props.room.name, this.state.msg)
    this.setState({msg:""})
    console.log('Stop typing');
    socket.emit('isTyping', false, username, this.props.room.name);
  }
  
  render() {
    return (
      <ChattContext.Consumer>
        {({ usersTyping }) => {
          return(
            <>
              <Form style={replystyle}>
                <div>{usersTyping[this.props.room.name]}</div>
                <TextArea 
                  rows={2}
                  style={textareastyle}
                  id="msg"
                  onChange={this.handleMsgChange}
                  value={this.state.msg}
                  onKeyPress={this.handleKeyPress}
                >
                </TextArea>
                <Button htmlType="submit" type="primary" style={buttonstyle} onClick={() => this.sendMsg()}>
                  Send Message
                </Button>
              </Form>
            </>
          )
        }}
      </ChattContext.Consumer>
    ) 
  }
}

export default ReplyMessage;

const textareastyle: CSSProperties = {
  display: "flex",
  width: "100%",
};

const replystyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  position: 'fixed',
  bottom: '0',
  width: '70%',
  marginBottom: '3rem',
};

const buttonstyle: CSSProperties = {
  width: '10rem',
  marginTop: '1rem'
};
