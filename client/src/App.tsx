import './App.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import SiderMenu from './components/ChatRooms/SiderMenu';
import React from 'react';
import StartView from './components/StartPage/StartView';

function App() {
  return (
    <Router>
        <ScrollToTop />
        <Header />
        <SiderMenu />
        <Switch>
        <StartView /> 
          {/* <Route exact path="/" component={} /> */}
        </Switch>
      </Router>
  );
}

export default App;
