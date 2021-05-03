import { Component, CSSProperties } from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const { Sider } = Layout;
class SiderMenu extends Component {

    render () {
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
                    <h3 style={headlineStyleOpen}>Open rooms</h3>
                    <Menu.Item key="1">
                        <Link to={'/'}> Room 1</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={'/'}>Room 2</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={'/'}>Room 3</Link>
                    </Menu.Item>
                    <h3 style={headlineStylePrivate}>Private rooms</h3>
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
    }
}

export default SiderMenu;

const headlineStyleOpen: CSSProperties = {
    paddingTop: '8rem', 
    paddingBottom: '2rem',
    paddingLeft: '1rem',
    fontWeight: 'bold',
}

const headlineStylePrivate: CSSProperties = {
    paddingTop: '3rem', 
    paddingBottom: '2rem',
    paddingLeft: '1rem',
    fontWeight: 'bold',
}