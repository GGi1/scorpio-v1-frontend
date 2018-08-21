import React, { Component } from 'react';
// import logo from '../images/logo.svg';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Home from '../pages/home';
import Main from '../pages/main';
import Exclusives from '../pages/exclusives';
import myFootable from '../pages/footable';
import Logos from '../pages/logos';
import Checkout from '../pages/checkout';
// import DataTable from '../components/datatable';
import {StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';

// import withAuth from '../serices/withAuth'
class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <StripeProvider apiKey="pk_test_12345">
      <MyStoreCheckout />
    </StripeProvider>
        <Router>
        <Switch>
          <Route exact path ="/login" component={Login} />
          <Route exact path ="/" component={Login} />
          <Route exact path ="/home" component={Home} />
          <Route exact path ="/main" component={Main} />
          <Route exact path ="/exclusives" component={Exclusives} />
          <Route exact path ="/footable" component={myFootable} />
          <Route exact path ="/logos" component={Logos} />
          <Route exact path ="/checkout" component={Checkout} />
          {/* <Route exact path ="/datatable" component={DataTable} /> */}
        </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
