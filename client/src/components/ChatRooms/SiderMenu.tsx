import { Component, ContextType, CSSProperties } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { LockFilled, PlusCircleFilled } from '@ant-design/icons';
import { ChattContext } from '../chatContext';

const { Sider } = Layout;
class SiderMenu extends Component {
    context!: ContextType<typeof ChattContext>
    static contextType = ChattContext;

    render () {
        return (
        <ChattContext.Consumer>
            {({ rooms }) => {
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                style={{
                    height: '100vh',
                    background: '#f1edea'
                }}
            >
                <Menu mode="inline" style={{ background: '#f1edea' }}>
                    <Link to='/new-room'>
                        <Button type="primary" icon={<PlusCircleFilled />} style={{ marginTop: '8rem', marginLeft: '1rem' }}>
                            Create room
                        </Button>
                    </Link>
                    <h3 style={headlineStyle}>Open rooms</h3>

                    {rooms.map((room: any) => {
                        return (
                            <Menu.Item key={room.name}>
                                <Link to={'/room/' + room.name}> {room.name}</Link>
                            </Menu.Item>
                        )
                    })}
                    <h3 style={headlineStyle}><LockFilled /> &nbsp; Private rooms</h3>
                    <Menu.Item key="4">
                        <Link to={'/'}> Room 1</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={'/'}>Room 2</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to={'/'}>Room 3</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }}
    </ChattContext.Consumer>
)
}    
}

export default SiderMenu;

const headlineStyle: CSSProperties = {
    paddingTop: '3rem', 
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    fontWeight: 'bold',
    color: '#44474f'
}
