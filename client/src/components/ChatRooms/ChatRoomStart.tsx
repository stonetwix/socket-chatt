import { Component } from 'react';
import { Layout } from 'antd';
import SiderMenu from './SiderMenu';
import JoinChatRoom from './JoinChatRoom';

class ChatRoomStart extends Component {
    render() {
        return(
            <Layout style={{ background: '#fff' }}>
                <SiderMenu />
                <JoinChatRoom />
            </Layout>
        )
    }
}

export default ChatRoomStart;