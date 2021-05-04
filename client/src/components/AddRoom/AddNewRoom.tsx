import { Component } from "react";
import { Form, Input, Button, message, Select, Layout } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";
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

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

interface Props extends RouteComponentProps<{ _id: string }> {}

interface State {
  isRoomPrivate: boolean;
}

const success = () => {
  message.success('The room has been added', 3);
};
class AddNewRoom extends Component<Props, State> {
    state: State = {
        isRoomPrivate: false,
    };

    onFinish = async (values: any) => {
        //await addNewUser(values.user);
        this.props.history.push('/admin/users');
    };

    onSelectChange = (value: any) => {
        this.setState({ isRoomPrivate: value === 'private' });
    }

    createPasswordComponents = () => {
        return (
            <>
                <Form.Item
                    label="Password"
                    name={["password"]}
                    rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                        required: true,
                        message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </>
        )
    }

  render() {
    const passwordField = this.state.isRoomPrivate ? this.createPasswordComponents() : <div></div>
   
    return (       
      <Layout style={{ background: '#fff' }}>
          <SiderMenu />
          <Content style={{ margin: '8rem', background: '#fff' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <Form
                      {...layout}
                      name="nest-messages"
                      onFinish={this.onFinish}
                      validateMessages={validateMessages}
                  >
                      <h1 style={{ fontWeight: "bold", marginBottom: '3rem' }}>CREATE NEW ROOM</h1>
                      <Form.Item name={["room", "name"]} label="Room name: " rules={[{ required: true }]}>
                          <Input />
                      </Form.Item>
    
                      <Form.Item name={["room", "status"]} label="Status: " rules={[{ required: true }]}>
                      <Select onChange={this.onSelectChange}>
                          <Select.Option value="open">Open</Select.Option>
                          <Select.Option value="private">Private</Select.Option>
                      </Select>
                      </Form.Item>
                      {passwordField}

                      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <Button 
                              type="primary"
                              onClick={() => {success()}} 
                              htmlType="submit" 
                              >
                              Save
                              </Button>
                          </div>
                      </Form.Item>
                  </Form>
              </div>
          </Content>
      </Layout>
    )
  }
}

export default withRouter(AddNewRoom); 