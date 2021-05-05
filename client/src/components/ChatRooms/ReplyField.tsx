import { Input, Button, Form } from 'antd';
import { Component, CSSProperties } from 'react';
import { sendMessage } from '../../socketUtils';

import { io } from "socket.io-client";
const endpoint = "http://localhost:3001";
export const socket = io(endpoint);

const { TextArea } = Input;

interface State {
  msg: string
}

interface Props {}

class ReplyMessage extends Component<Props, State> {

  constructor(props: State) {
    super(props);
    this.state = {
      msg:""
    }
  }

  // Handle the input onchange
  handleMsgChange = (e:any) => {
    this.setState({msg:e.target.value})
  }
 
  // This function sends back the input value to the sever
  // The input value will also be reset
  sendMsg = (e:any) => {

    e.preventDefault();

     // A function that is imported from socketUtils
    sendMessage(this.state.msg)
    this.setState({msg:""})

  }




  render() {
    return (
      <Form style={replystyle}>
        <TextArea 
          rows={2}
          style={textareastyle}
          id="msg"
          onChange={this.handleMsgChange}
          value={this.state.msg} >
        </TextArea>
        <Button htmlType="submit" type="primary" style={buttonstyle} onClick={this.sendMsg}>
          Send Message
        </Button>
      </Form>
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
