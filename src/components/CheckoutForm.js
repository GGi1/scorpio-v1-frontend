import React from 'react';
import {injectStripe} from 'react-stripe-elements';

// import AddressSection from './AddressSection';
import CardSection from './CardSection';

const BASE = 'https://scorpio-music-backend-api.herokuapp.com';


class CheckoutForm extends React.Component {
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  };

  submit(event) {
    // let { charge } = this.state
    let charge = 100
    console.log(charge)
       
    return fetch(BASE+'/charges', {
      body: "test body",
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST"
    }).then(res => {
      console.log(res)
    })  
    }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <CardSection />
        <button>Confirm order</button>
        <button onClick={this.submit}>Send</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);