import React, { Component } from 'react';
import { Layout } from 'antd';
import ChatRoomFeed from './ChatRoomFeed';
import ReplyMessage from './ReplyField';
import SiderMenu from './SiderMenu';
import JoinChatRoom from './JoinChatRoom';

const { Content } = Layout;

class ChatRoomView extends Component {
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

export default ChatRoomView;