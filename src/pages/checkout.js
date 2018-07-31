import React, { Component } from 'react';
import withAuth from '../services/withAuth';
import {TextField, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Card, Button, Icon, TableCell, TableFooter, TablePagination, TableRow} from '@material-ui/core'

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';


class Checkout extends Component {
  constructor(props){
    super(props)
      this.state={
        open: [],
        myorder: [],
      }
    }

    componentWillMount(){
    let myorder = []
        if (localStorage && localStorage.getItem('myorder')) {
            var cart = JSON.parse(localStorage.getItem('myorder'));
             myorder = cart
          console.log(myorder);
        }
        
            this.setState({
            myorder: myorder
            }
          )
            }
   
            handleClickOpen = (element,index) => {
                let {open} = this.state
                open[index] = true
                  this.setState({ open: open});
                };

                handleClose = (element,index) => {
                    let {open} = this.state
                    open[index] = false
                    this.setState({ open: open });
                  };

                  removeItem(element, index){
                    let {myorder} = this.state
                    myorder.splice(index, 1)
                    this.setState({myorder: myorder}, this.setmyorder, this.isThereAnOrder, this.handleClose(element,index)
                  )
                  }

                  setmyorder() {
                    // localStorage.setItem( 'myorder',{price: '9.95', title: 'baby'});
                    localStorage.setItem('myorder', JSON.stringify(this.state.myorder));
                    var order = localStorage.getItem('myorder');
                    console.log(order);
                    this.getTotalPrice()
                    // this.setState( { myorder: 'myorder'} );
                }

                getTotalPrice(){
                    let {myorder} = this.state
                    let price = 0
                    myorder.map((element)=>{
                    price = parseFloat(element.price) + price
                    }
                  )
                  // console.log("price:");
                  // console.log(price);
                  return (
                  price.toFixed(2)
                    )
                  }

                  showOrder(){

                  }

      render(){
        return (
          <div>
           
              

              <div className='banner-thin'> 
                <div className='show-order-summary' onClick={this.showOrder} >
                    <Icon>shopping_cart</Icon>   &nbsp; Show order summary <Icon>arrow_drop_down</Icon> </div>
              
                <div className='total-price-banner'> ${this.getTotalPrice()}</div>
                </div>
              <div className='checkout-body'>   
              <Card className='checkout-card'>
My Order


<table>

{this.state.myorder.map((element,index)=>

    <tr key={index}>
     <td>  {element.title} <br/> {element.artist}</td>
<td> {1}</td>
 <td> ${parseInt(element.price).toFixed(2)}</td>
   <td> <Icon onClick={this.handleClickOpen.bind(this,element,index)}>delete</Icon>
   {/* {console.log(this.state.open)} */}
   <Dialog
     open={this.state.open[index]}
     onClose={this.handleClose.bind(this,element,index)}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
   >
     <DialogTitle id="alert-dialog-title">{<Icon>delete</Icon>}</DialogTitle>
     <DialogContent>
       <DialogContentText id="alert-dialog-description">
         Remove {element.title} from order?
       </DialogContentText>
     </DialogContent>
     <DialogActions>
       <Button onClick={this.handleClose.bind(this,element,index)} color="primary">
         Disagree
       </Button>
       <Button onClick={this.removeItem.bind(this, element, index)} color="primary" autoFocus>
         Agree
       </Button>
     </DialogActions>
   </Dialog></td>

   </tr>
)}
</table>
</Card>
            </div>



            <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>





          </div>
        )
      }

}
export default withAuth(Checkout)
