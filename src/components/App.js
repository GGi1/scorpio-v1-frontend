import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
<Router>
<Switch>
  <Route exact path ="/login" component={Login} />
  <Route exact path ="/" component={Login} />
</Switch>
</Router>

      </div>
    );
  }
}

export default App;
