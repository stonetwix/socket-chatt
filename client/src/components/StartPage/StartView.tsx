import { Input, Button, Row, Col, Divider, Form } from "antd";
import { CSSProperties, Component } from "react";



class Welcome extends Component {
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quasi
            quam illum eos sit eveniet consequuntur cumque suscipit, optio minus
            ipsum cum magnam fuga ratione iste omnis. Aspernatur, fuga mollitia!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quasi
            quam illum eos sit eveniet consequuntur cumque suscipit, optio minus
            ipsum cum magnam fuga ratione iste omnis. Aspernatur, fuga mollitia!
          </p>

          <Divider plain>Start here!</Divider>
          <div style={formStyle}>
          <h3
            style={{
              fontWeight: "bold",
              marginTop: "0.7rem",
            }}
          >
            Enter your name
          </h3>

          <Form style={align}>
            <Form.Item name="username">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" style={buttonStyle}>
                Join
              </Button>
            </Form.Item>
          </Form>
          </div>
        </Col>
      </Row>
    );
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
