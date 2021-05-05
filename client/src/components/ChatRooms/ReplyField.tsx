import { Input, Button, Form } from 'antd';
import { Component, CSSProperties } from 'react';
import { sendMessage } from '../../socketUtils';

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

  // state: State = {
  //   msg: ""
  // }

  handleMsgChange = (e:any) => {
    this.setState({msg:e.target.value})
  }

  sendMsg = (e:any) => {
    e.preventDefault();

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

// function setMsg(value: any) {
//   throw new Error('Function not implemented.');
// }
