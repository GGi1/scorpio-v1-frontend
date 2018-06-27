import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Home from '../pages/home';
// import withAuth from '../serices/withAuth'
class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Router>
        <Switch>
          <Route exact path ="/login" component={Login} />
          <Route exact path ="/" component={Login} />
          <Route exact path ="/home" component={Home} />
        </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
