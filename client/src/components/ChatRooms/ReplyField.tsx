import { Input, Button, Form } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { sendMessage, socket } from '../../socketUtils';
import { ChattContext } from '../chatContext';
import { Room } from '../AddRoom/AddNewRoom';
import istyping from '../../assets/typing2.gif'; 

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

  // Handle the input onchange
  handleMsgChange = async (e: any) => {
    if (e.target.value === '/cat') {
      this.setState({msg: await fetchCatFacts()})
    }
    if (e.target.value === '/chuck') {
      this.setState({msg: await fetchChuckNorris()})
    }

    const { username } = this.context;
    if (!this.state.msg) {
      console.log('Start typing');
      socket.emit('isTyping', true, username, this.props.room.name);
    }
    this.setState({msg: e.target.value})
    
  }

  // This function sends back the input value to the sever
  // The input value will also be reset
  sendMsg = async () => {
    const { username } = this.context;
     // A function that is imported from socketUtils
    sendMessage(username, this.props.room.name, this.state.msg)
    this.setState({msg:""})
    console.log('Stop typing');
    socket.emit('isTyping', false, username, this.props.room.name);
  }
  
  usersTypingInRoom = (usersInRoom: string[]) => {
    if (!usersInRoom || usersInRoom.length === 0) {
      return <div></div>;
    }
    return (
      <div>
        <img src={istyping} alt="istyping" />{usersInRoom.join(', ') + ' is typing...'}
      </div>
    );
  }

  render() {
    return (
      <ChattContext.Consumer>
        {({ usersTyping }) => {
          return(
            <>
              <Form style={replystyle}>
                {this.usersTypingInRoom(usersTyping[this.props.room.name])}
                <Input 
                  style={textareastyle}
                  id="msg"
                  onChange={this.handleMsgChange}
                  value={this.state.msg}
                >
                </Input>
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

async function fetchCatFacts() {
  try {
      const url = "https://catfact.ninja/fact?max_length=140";
      const result = await fetch(url);
      const data = await result.json();
      return data.fact;    
  } catch (error) {
      console.log(error);
  }
};

async function fetchChuckNorris() {
  try {
      const url = "https://api.chucknorris.io/jokes/random";
      const result = await fetch(url);
      const data = await result.json();
      return data.value;    
  } catch (error) {
      console.log(error);
  }
};