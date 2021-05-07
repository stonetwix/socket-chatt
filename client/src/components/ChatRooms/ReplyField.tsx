import { Input, Button, Form } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { sendMessage } from '../../socketUtils';
import PropTypes from 'prop-types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ChattContext } from '../chatContext';

const { TextArea } = Input;

interface State {
  msg: string
}

interface Props extends RouteComponentProps {
  location: any
}

class ReplyMessage extends Component<Props, State> {
  context!: ContextType<typeof ChattContext>
  static contextType = ChattContext;

  static propTypes = {
    location: PropTypes.object.isRequired
  }

  state: State = {
    msg: '',
  };

  // Handle the input onchange
  handleMsgChange = (e:any) => {
    this.setState({msg:e.target.value})
  }
 
  // This function sends back the input value to the sever
  // The input value will also be reset
  sendMsg = (username: string) => {
    const { location } = this.props;
    const roomName = location.pathname.split('/').slice(-1).pop();
     // A function that is imported from socketUtils
    sendMessage(username, roomName, this.state.msg)
    this.setState({msg:""})
  }
  
  render() {
    return (
      <ChattContext.Consumer>
        {({ username }) => {
          return(
              <Form style={replystyle}>
                <TextArea 
                  rows={2}
                  style={textareastyle}
                  id="msg"
                  onChange={this.handleMsgChange}
                  value={this.state.msg} >
                </TextArea>
                <Button htmlType="submit" type="primary" style={buttonstyle} onClick={() => this.sendMsg(username)}>
                  Send Message
                </Button>
              </Form>
            )
  }}
    </ChattContext.Consumer>
  ) 
}
}

export default withRouter(ReplyMessage);

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
