import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import SiderMenu from './components/ChatRooms/SiderMenu';
import ChatRoomFeed from './components/ChatRooms/ChatRoomFeed';
import ChatRoomView from './components/ChatRooms/ChatRoomView';

function App() {
  return (
    <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/" component={ChatRoomView} />
        </Switch>
      </Router>
  );
}

export default App;
