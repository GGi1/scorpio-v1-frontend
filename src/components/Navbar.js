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
      {/* <img src={logo} className="App-logo" alt="logo" /> */}

      {/* <div className="logo-title">
        <div className="scorpio">scorpio</div>
        <div className="since">Music Distributors</div>
      </div> */}




<div className="logo-title">
  <div className="scorpio" style={{fontFamily: "'Passion One', cursive"}}>scorpio</div>
  <div className="since" style={{marginLeft: '24px', marginTop: '-10px', fontFamily: "'Passion One', cursive"}}>music distributors</div>
</div>
    </header>

  )
}
}
