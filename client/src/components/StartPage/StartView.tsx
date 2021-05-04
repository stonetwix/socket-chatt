import { Input, Button, Row, Col, Divider, Form } from "antd";
import { CSSProperties, Component } from "react";

/*
const layout = {
    labelCol: {
    span: 8,
  },
    wrapperCol: {
      span: 16,
    },
  };
  
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
*/

class Welcome extends Component {
  render() {
    return (
      <Row style={containerStyle}>
        <Col span={24} style={columnStyle}>
          <h1
            style={{
              fontWeight: "bold",
            }}
          >
            Welcome to chatname
          </h1>
          <p>
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quasi
            quam illum eos sit eveniet consequuntur cumque suscipit, optio minus
            ipsum cum magnam fuga ratione iste omnis. Aspernatur, fuga mollitia!
          </p>

          <Divider plain>Start here!</Divider>
          <h3
            style={{
              fontWeight: "bold",
              marginTop: "0.7rem",
            }}
          >
            Enter your name
          </h3>

          <Form>
            <Form.Item name="username">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" style={buttonStyle}>
                Join
              </Button>
            </Form.Item>
          </Form>
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
