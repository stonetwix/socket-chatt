import { Row, Col } from "antd";
import { Header} from "antd/lib/layout/layout";
import { Component, CSSProperties } from "react";
import logo from '../assets/logo-white.png'; 
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
        return (
            <Header style={layoutStyle}>
                <Row style={{ width: '100%' }}>
                    <Col span={24} style={colStyle}>
                        <Link to='/'>
                            <img src={logo} alt="logo" style={logoStyle} />
                        </Link>
                    </Col>
                </Row>
            </Header> 
        )
    }
}; 

export default Navbar;


const layoutStyle: CSSProperties = {
    width: '100%', 
    top: '0',
    left: '0',
    background: '#98c3bc',
    height: '5rem',
    display: 'flex', 
    alignItems:'center',
    justifyItems:'center',
    zIndex: 100,
    position: 'fixed',
  }

  const colStyle: CSSProperties = {
    width: '100%',
    display: 'flex', 
    alignItems:'center',
    justifyItems:'center',
  }

  const logoStyle: CSSProperties = {
   width: '14rem',
  }