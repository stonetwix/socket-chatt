import { Input, Button, Form } from 'antd';
import { Component, CSSProperties } from 'react';

const { TextArea } = Input;

class ReplyMessage extends Component {

  render() {
    return (
      <Form style={replystyle}>
        <TextArea 
          rows={2}
          style={textareastyle} >
        </TextArea>
        <Button htmlType="submit" type="primary" style={buttonstyle}>
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