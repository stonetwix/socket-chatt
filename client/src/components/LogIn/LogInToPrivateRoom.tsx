import { Form, Input, Button, Row, Col, Layout } from "antd";
import { CSSProperties, Component } from "react";
import { Route } from 'react-router-dom';
import { authenticate } from "../../socketUtils";
import { Room } from "../AddRoom/AddNewRoom";
import SiderMenu from '../ChatRooms/SiderMenu';

const { Content } = Layout;

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  interface Props {
      room: Room;
  }
class LogIn extends Component<Props> {

  onFinish = (values: any, history: any) => {
    authenticate(this.props.room, values.password);
    //history.push()
    // const { setUser } = this.context;
    // const user = await login(values.email, values.password);
    // if (user) {
    //   setUser(user.username, user.role === 'admin');
    //   history.push('/user/');
    // } else {
    //   alert('Not valid e-mail or password');
    // }
  };

  render() {
    return (
        <Layout style={{ background: '#fff' }}>
            <SiderMenu />
            <Content style={{ margin: '8rem', background: '#fff' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Row>
                        <Col span={24}>
                        <h1 style={{ fontWeight: "bold", marginBottom: '3rem' }}>
                            LOG IN TO PRIVATE ROOM
                        </h1>
                        <Route render={({ history }) => (
                            <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={(values) => this.onFinish(values, history)}
                            >
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit" 
                                        style={buttonStyle}
                                    >
                                        Log in
                                    </Button>
                                </div>
                            </Form.Item>
                            </Form>
                        )}/>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
  }
}

const buttonStyle: CSSProperties = {
  float: "right",
  fontWeight: "bold",
};

export default LogIn;