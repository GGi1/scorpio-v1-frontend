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
        display_order: 'none',
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
                      console.log(element)
                    price = parseFloat(element.price*element.quantity) + price
                    }
                  )
                  // console.log("price:");
                  // console.log(price);
                  return (
                  price.toFixed(2)
                    )
                  }

                  getTotalQuantity(){
                    let {myorder} = this.state
                    let quantity = 0
                  
                    myorder.map((element)=>{
                    quantity = element.quantity + quantity
                    }
                  )
                  return (
                  quantity
                    )
                  }
                  

                  showOrder(){
                    let display =''
                    let {display_order} = this.state
                    console.log(display_order)
                    if(display_order == 'none'){
                        display = 'flex'
                    } else display = 'none'
                    this.setState({display_order: display})
                  }

      render(){
        return (
          <div>
           
              

              <div className='banner-thin'> 
                <div className='show-order-summary' onClick={this.showOrder.bind(this)} >
                    <Icon>shopping_cart</Icon>   &nbsp; Review Order <Icon>arrow_drop_down</Icon> </div>
              
                <div className='total-price-banner'>  ${this.getTotalPrice()}</div>
                </div>
              <div className='checkout-body'>   
              <Card className='checkout-card' style={{display: this.state.display_order}}>



<table style={{width:"100%"}}>
<caption>My Order</caption>
  <tr>
    <th>Title</th>
    <th>Artist</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Price extended</th>
  </tr>
  <tbody>
    {this.state.myorder.map((element,index)=>
    <tr key={index}>
     <td>  {element.title} </td>
     <td> {element.artist}</td>
     <td> ${parseInt(element.price).toFixed(2)}</td>
     <td> {element.quantity}</td>

 <td> ${(parseInt(element.price)*parseInt(element.quantity)).toFixed(2)}</td>
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
</tbody>
</table>
</Card>
            


<div className='paywithcard'>
<Card style={{padding: '20px', width: '480px'}}>
            <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
        <div className="example">
          <h3>Pay with Card</h3>
          <Elements>
            <CheckoutForm/>
          </Elements>
        </div>
      </StripeProvider>
      </Card>
</div>


</div>

          </div>
        )
      }

}
export default withAuth(Checkout)
