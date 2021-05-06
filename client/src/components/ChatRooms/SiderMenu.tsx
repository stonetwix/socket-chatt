import { Component, ContextType, CSSProperties } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { LockFilled, PlusCircleFilled } from '@ant-design/icons';
import { ChattContext } from '../chatContext';
import { Room } from '../AddRoom/AddNewRoom';
import PropTypes from 'prop-types';

const { Sider } = Layout;

interface Props extends RouteComponentProps {
    location: any
}
class SiderMenu extends Component<Props> {
    context!: ContextType<typeof ChattContext>
    static contextType = ChattContext;

    static propTypes = {
        location: PropTypes.object.isRequired
    }

    createMenuItems = (rooms: Room[]) => {
        return rooms.map((room: Room) => {
            return (
                <Menu.Item key={'/room/' + room.name}>
                    <Link to={'/room/' + room.name}>{room.name}</Link>
                </Menu.Item>
            )
        })
    }

    render () {
        const { location } = this.props;
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
                            <Menu mode="inline" style={{ background: '#f1edea' }} defaultSelectedKeys={[location.pathname]} selectedKeys={[location.pathname]}>
                                <Link to='/new-room'>
                                    <Button type="primary" icon={<PlusCircleFilled />} style={{ marginTop: '8rem', marginLeft: '1rem' }}>
                                        Create room
                                    </Button>
                                </Link>
                                <h3 style={headlineStyle}>Open rooms</h3>
                                {this.createMenuItems(rooms.filter(room => !room.isPrivate))}

                                <h3 style={headlineStyle}><LockFilled /> &nbsp; Private rooms</h3>
                                {this.createMenuItems(rooms.filter(room => room.isPrivate))}
                            </Menu>
                        </Sider>
                    )
                }}
            </ChattContext.Consumer>
        )
    }    
}

export default withRouter(SiderMenu);

const headlineStyle: CSSProperties = {
    paddingTop: '3rem', 
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    fontWeight: 'bold',
    color: '#44474f'
}
