import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import AddNewRoom from './components/AddRoom/AddNewRoom';

function App() {
  return (
    <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/" component={AddNewRoom} />
        </Switch>
      </Router>
  );
}

export default App;
