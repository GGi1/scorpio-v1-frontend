import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Button} from '@material-ui/core'

import {newCharge} from "../api"


const BASE = 'https://scorpio-music-backend-api.herokuapp.com';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      charge: '100'
    };
  
    this.submit = this.submit.bind(this);
  }

  // submit(ev){
  //   let {mytoken} = this.props.stripe.createToken({name: "Name"});
  //   console.log(this.props.stripe)
  //   console.log(mytoken.token.id)
//   fetch(BASE+'/charge', {
  
//     body: token.id,
//     headers: {"Content-Type": "text/plain"},
//     // headers: {
//     //     'Content-Type': 'application/json'
//     // },
//     method: "POST"
// })
//     .then((rawResponse) => {
//     //   console.log(rawResponse)
//     //     let parsedResponse = rawResponse.json()
//     //     return parsedResponse
//     // }).then( userhistoryAdded => {
//     //     console.log("Create Success!")
//     })
// })
// }


  
// async submit(ev) {
//   let newCharge = {ev: ev}
//   let {token} = await this.props.stripe.createToken({name: "Name"});
//   let response = await fetch('http://localhost:3000' +"/charges", {
//     method: "POST",
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(token.id)
//   });

//   if (response.ok) console.log("Purchase Complete!")
// }


submit(event) {
  let { charge } = this.state
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
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p></p>
        <CardElement />
        <Button onClick={this.submit}>Send</Button>
      </div>
    );
    }
}

export default injectStripe(CheckoutForm);