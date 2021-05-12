import { Row, Col, } from "antd";
import { CSSProperties, Component } from "react";



class JoinChatRoom extends Component {
  render() {
    return (
      <Row style={containerStyle}>
        <Col span={24} style={columnStyle}>
            <div style={center}>

          <h1 style={{fontWeight: "bold"}}>
            Start Waffle!
          </h1>
          <p>
            {" "}
            Join an existing room or create a new one to start waffling.
          </p>
            </div>

        </Col>
      </Row>
    );
  }
}

export default JoinChatRoom;

const containerStyle: CSSProperties = {
  width: "60%",
  display: "flex",
  margin: "auto",
  justifyContent: "center",
};
const center: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
};

const columnStyle: CSSProperties = {
  marginTop: "4rem",
};

