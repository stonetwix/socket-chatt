import React, { Component, CSSProperties } from 'react';
import { Comment, Tooltip, List } from 'antd';
import { Input, Button, Form } from 'antd';
import moment from 'moment';
import Layout, { Content } from 'antd/lib/layout/layout';
import SiderMenu from './SiderMenu';

const { TextArea } = Input;

const data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
  ];


class ChatRoomFeed extends Component {

    render() {
      return (
        <Layout style={{ background: '#fff' }}>
          <SiderMenu />
          <Content style={{ margin: '8rem', background: '#fff' }}>
          <div className="site-layout-background" style={{ minHeight: 360 }}>

            <List 
            style={feedlist}
            dataSource={data}
            renderItem={item => (
                <li>
                <Comment
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                />
                </li>
            )}
            />
                  <Form style={replystyle}>
        <TextArea 
          rows={2}
          style={textareastyle} >
        </TextArea>
        <Button type="primary" style={buttonstyle}>
         SEND
         </Button>
         </Form>
         </div>
        </Content>
        </Layout>
        ) 
    }
}
 


export default ChatRoomFeed;

const feedlist: CSSProperties = {
    display: "flex",
    margin: "auto",
    width: "60%"
  };
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
    margin: "auto",
  };