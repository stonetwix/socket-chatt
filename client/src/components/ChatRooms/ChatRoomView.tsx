import React, { Component } from 'react';
import { Layout } from 'antd';
import ChatRoomFeed from './ChatRoomFeed';
import ReplyMessage from './ReplyField';
import SiderMenu from './SiderMenu';

const { Content } = Layout;

class LogInView extends Component {
    render() {
        return(
            <Layout style={{ background: '#fff' }}>
                <SiderMenu />
                <Content style={{ margin: '8rem', background: '#fff' }}>
                    <ChatRoomFeed /> 
                    <ReplyMessage />
                </Content>
            </Layout>
        )
    }
}

export default LogInView;