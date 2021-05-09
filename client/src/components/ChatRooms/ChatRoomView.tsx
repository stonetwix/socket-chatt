import React, { Component, ContextType } from 'react';
import { Layout } from 'antd';
import ChatRoomFeed from './ChatRoomFeed';
import ReplyMessage from './ReplyField';
import SiderMenu from './SiderMenu';
import { ChattContext } from '../chatContext';
import { RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Room } from '../AddRoom/AddNewRoom';
import LogIn from '../LogIn/LogInToPrivateRoom';

const { Content } = Layout;

interface Props extends RouteComponentProps {
    location: any
}

class ChatRoomView extends Component<Props> {
    context!: ContextType<typeof ChattContext>
    static contextType = ChattContext;

    static propTypes = {
        location: PropTypes.object.isRequired
    }

    render() {
        const { location } = this.props;
        const roomName = location.pathname.split('/').slice(-1).pop();
        const { rooms } = this.context;
        const room = rooms.find((room: Room) => room.name === roomName);
        if (!room) {
            return <div></div>
        }
        if (room.isPrivate && !room.isAuthenticated) {
            return <LogIn room={room} />
        }
        return(
            <Layout style={{ background: '#fff' }}>
                <SiderMenu />
                <Content style={{ margin: '8rem', background: '#fff' }}>
                    <ChatRoomFeed room={room} /> 
                    <ReplyMessage />
                </Content>
            </Layout>
        )
    }
}

export default ChatRoomView;