import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Login from './Login';
// import Home from '../pages/home';
// import withAuth from '../serices/withAuth'
export default class Navbar extends Component {

render(){
  return(
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      <div className="logo-title">
        <div className="scorpio">SCORPIO</div>
        <div className="since">Music Distributors</div>
      </div>

    </header>

  )
}
}
