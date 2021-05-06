import { Row, Col, } from "antd";
import React, { CSSProperties, Component } from "react";



class JoinChatRoom extends Component {
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
            Start Waffle!
          </h1>
          <p>
            {" "}
            Join an existing room or create a new one to start waffling.
          </p>

        </Col>
      </Row>
    );
  }
}

export default JoinChatRoom;

const containerStyle: CSSProperties = {
  width: "60%",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
};

const columnStyle: CSSProperties = {
  marginTop: "14rem",
};

