import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import AddNewRoom from './components/AddRoom/AddNewRoom';
import LogIn from './components/LogIn/LogInToPrivateRoom';
import SiderMenu from './components/ChatRooms/SiderMenu';
import ChatRoomFeed from './components/ChatRooms/ChatRoomFeed';
import ChatRoomView from './components/ChatRooms/ChatRoomView';
import StartView from './components/StartPage/StartView';

function App() {
  return (
    <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/" component={StartView} />
          <Route exact path="/rooms" component={ChatRoomView} />
          <Route exact path="/new-room" component={AddNewRoom} />
          {/* <Route exact path="/" component={LogIn} /> */}
          {/* <Route exact path="/" component={StartView} /> */}
        </Switch>
      </Router>
  );
}

export default App;
