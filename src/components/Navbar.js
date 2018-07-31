import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Login from './Login';
import Logo from '../components/logo';
// import withAuth from '../serices/withAuth'
export default class Navbar extends Component {

render(){
  return(
    <div>
    <header className="App-header">

      <img src={logo} className="App-logo" alt="logo" />

      {/* <div className="logo-title">
        <div className="scorpio">scorpio</div>
        <div className="since">Music Distributors</div>
      </div> */}




<div className="logo-title">
  <div className="scorpio" >scorpio</div>
  {Logo}
  <div className="since" style={{marginTop: '-10px', fontFamily: "'Passion One', cursive"}}>music distributors</div>
</div>
    </header>
    </div>

  )
}
}
