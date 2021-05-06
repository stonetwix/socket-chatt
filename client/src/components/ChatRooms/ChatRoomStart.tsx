import React, { Component } from 'react';
import { Layout } from 'antd';
import ChatRoomFeed from './ChatRoomFeed';
import ReplyMessage from './ReplyField';
import SiderMenu from './SiderMenu';
import JoinChatRoom from './JoinChatRoom';

const { Content } = Layout;

class ChatRoomStart extends Component {
    render() {
        return(
            <Layout style={{ background: '#fff' }}>
                <SiderMenu />
                <JoinChatRoom />
                {/* <Content style={{ margin: '8rem', background: '#fff' }}>
                    <ChatRoomFeed /> 
                    <ReplyMessage />
                </Content> */}
            </Layout>
        )
    }
}

export default ChatRoomStart;