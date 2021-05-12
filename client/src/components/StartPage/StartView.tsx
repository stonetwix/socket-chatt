import { Input, Button, Row, Col, Divider, Form } from "antd";
import { CSSProperties, Component, ContextType } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ChattContext } from "../chatContext";


interface Props extends RouteComponentProps {}

class Welcome extends Component <Props> {
  context!: ContextType<typeof ChattContext>
  static contextType = ChattContext;

  onFinish = (values: any) => {
    const { setUsername } = this.context;
    setUsername(values.username);
    this.props.history.push('/rooms');
  }

  render() {
    return (
      <Row style={containerStyle}>
        <Col span={24} style={columnStyle}>
          <h1
            style={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Welcome to Waffle
          </h1>
          <p>
            {" "}
            Waffle is a chatt app where you can create your own chat rooms and waffle with people from all over the world. If you want to waffle private to someone you can create a private room. You can also get random cat facts or a random Chuck Norris joke by typing /cat or /chuck in the message field. 
          </p>

          <Divider plain style={{marginTop: '2rem'}}>Start here!</Divider>
          <div style={formStyle}>
          <h3
            style={{
              fontWeight: "bold",
              marginTop: "0.7rem",
            }}
          >
            Enter your name
          </h3>

          <Form style={align} onFinish={this.onFinish}>
            <Form.Item name="username">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button 
                htmlType="submit" 
                style={buttonStyle}
              > 
                Join
              </Button>
            </Form.Item>
          </Form>
          </div>
        </Col>
      </Row>
    ) 
  }
}

export default Welcome;

const containerStyle: CSSProperties = {
  width: "60%",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
};

const columnStyle: CSSProperties = {
  marginTop: "14rem",
};

const buttonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "#98c3bc",
  color: "white",
  border: "none",
  marginTop: "1rem",
};
const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

};
const align: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

};
