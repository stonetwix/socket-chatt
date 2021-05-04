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
        <Button type="primary" style={buttonstyle}>
         SEND
         </Button>
         </Form>
      )
}
}

export default ReplyMessage;





const textareastyle: CSSProperties = {
  display: "flex",
  margin: "auto",
  width: "60%",
};
const replystyle: CSSProperties = {
  display: "flex",
  margin: "auto",
  flexDirection: "column",

};
const buttonstyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  margin: "auto"
};