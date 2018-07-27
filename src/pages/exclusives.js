import React, { Component } from 'react';
import withAuth from '../services/withAuth';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Card, Button, Icon, Table, TableHead,TableBody, TableCell, TableFooter, TablePagination, TableRow} from '@material-ui/core'
import TablePaginationActions from '../components/TablePaginationActions.js'
import { withStyles } from '@material-ui/core/styles';
// import AlertDialog from '../components/dialog';

console.log(TablePaginationActions);


const reducer = (accumulator, currentValue) => accumulator + currentValue;

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);
const BASE = 'http://localhost:3000';
const cart = localStorage.getItem( 'myorder' )

class Exclusives extends Component {
    constructor(props){
    super(props)
    this.myTablePaginationActions = new TablePaginationActions()
      this.state={
        order: 'show',
        // orderpage:'',
        allvinyl: [],
        myorder: [],
        myorderpage: 'none',
        rowsPerPage: 5,
        page: 0,
        count: 1,
        open: [],
        totalprice: 0
      }

  }

  componentWillMount(){

    console.log(this.myTablePaginationActions);
    // let userID = Auth.getUserId()
let myorder = []
// if (localStorage && localStorage.getItem('cart')) {
//      var cart = JSON.parse(localStorage.getItem('cart'));
    // localStorage.setItem('cart', JSON.stringify(cart))
    if (localStorage && localStorage.getItem('myorder')) {
      console.log("TEST");
    var cart = JSON.parse(localStorage.getItem('myorder'));
    // if(cart){
      myorder = cart
      console.log(myorder);
    }
    return fetch(BASE + '/exclusives')
      .then((resp) => {
        return resp.json()
      })
      .then(APIinfo => {
        if(APIinfo.length ==0 ){

          // this.props.history.push('/log', nodata.true)
        } else{
          console.log(myorder[0]);
        this.setState({
          allvinyl: APIinfo, myorder: myorder
        }
        // , this.getInitialState


      )
        }
})
}

getInitialState() {
    var myorder = localStorage.getItem( 'myorder' );
    // console.log(myorder);
    if(myorder == 'undefined'){
      myorder = [];
      console.log('here');
    } else{
      console.log('there');
      }
      console.log(myorder);
    this.setState( { myorder: myorder} );
    // return {
    //     myorder: myorder
    // };
}

getTotalPrice(){
  let {myorder} = this.state
  let price = 0
  myorder.map((element)=>{
  price = parseFloat(element.price) + price
  }
)
console.log("price:");
console.log(price);
return (
price

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

clearcart(){
   localStorage.removeItem('myorder');
   this.setState({myorder: []})
}

handleChangePage = (event, page) => {
  this.setState({ page });
};

toggleOrder(){
  let myorderpage

  if(this.state.myorderpage == 'flex'){
    myorderpage = 'none'
  } else {
    myorderpage = 'flex'
  }

  this.setState({myorderpage: myorderpage})
}


addToOrder(element){
  let {myorder} = this.state
  myorder.push(element)
  this.setState({myorder: myorder}, this.setmyorder)
}




handleChangeRowsPerPage = event => {
  this.setState({ rowsPerPage: event.target.value });
}

removeItem(element, index){
  let {myorder} = this.state
  myorder.splice(index, 1)
  this.setState({myorder: myorder}, this.setmyorder, this.handleClose(element,index)
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


// handleChangeRowsPerPage(event){
//   this.setState({ rowsPerPage: event.target.value })
// }
// addToOrder(element){
//   let {myorder} = this.state
//   // let {orderpage} = this.state
//   console.log('added to order' + element.id);
//   myorder.push(element.price)
//   // console.log(this.state.orderpage)
//     console.log(myorder)
//   orderpage =  <div className='inorder'>
//     My Order: {myorder.map((element,index)=>
//     element)}
//     </div>
// this.setState({myorder: myorder, orderpage: orderpage}, this.setmyorder)
// }



  render() {


// console.log(TablePaginationActions);

    return (
      <div>

        <div className = "banner">EXCLUSIVES
        </div>

        <div className="bigbox">




    <div className="mainpage">
<Button variant="outline">  </Button>


            {this.state.allvinyl.map((element,index)  =>
              <Card className='itemcard'>
                <div className='record' style={{backgroundImage: `url(/assets/images/${element.pic})`}}>
                </div>
                  <table>
                <div className="title">{element.title}</div>
                <div className="artist">{element.artist}</div>
                <div className="title">${element.price}</div>
                 <Button  onClick = {this.addToOrder.bind(this, element)} variant="outlined" color="primary"><Icon style={{paddingRight: '6px'}}>add_shopping_cart</Icon>
                Add to Cart
            </Button>



                <tr className="labelandnum">{element.label}{element.labelnum}</tr>

              </table>

              </Card>
          )}
          </div>
          <div className="orderbutton" onClick={this.toggleOrder.bind(this)}><Button variant="contained" color="primary"><Icon style={{padding: '0px'}}>shopping_cart</Icon>
          <div>Total: ${this.getTotalPrice()}</div>
    </Button>
            {/* <div className="ordertext">my order
      </div> */}

          </div>
          <div className="order" >

            {/* {this.state.orderpage} */}

            <div className='inorder' style={{display: this.state.myorderpage}}>
              <Card>
<div className='ordertable'>
              <Table>
              <TableHead>
                <TableCell colSpan={4}>
                <Typography variant="title" id="tableTitle" style={{position: 'center', display: 'flex', justifyContent: 'center'}}>
              My Order
            </Typography>
            </TableCell>


                {/* <TableRow>
                <TableCell>
                </TableCell>
                </TableRow> */}


            </TableHead>
<TableBody>
      <TableRow>
        <TableCell component="th" scope="row">
          Title
        </TableCell>
        <TableCell numeric className="quantitycell">Quantity</TableCell>
        <TableCell numeric className="quantitycell">Price</TableCell>
          <TableCell numeric className="quantitycell"></TableCell>
      </TableRow>
              {this.state.myorder.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((element,index)=>
                <TableRow key={index}>
                  <TableCell className="titlecell"  component="th" scope="row">
                    {element.title}
                  </TableCell>
                  <TableCell numeric className="quantitycell">{1}</TableCell>
                  <TableCell numeric className="quantitycell">${element.price}</TableCell>
                  <TableCell numeric className="quantitycell">
                          <Icon onClick={this.handleClickOpen.bind(this,element,index)}>delete</Icon>
                          {console.log(this.state.open)}
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
                          </Dialog>












                </TableCell>







                </TableRow>





              //
              // element.price

            )}


  </TableBody>
  <TableFooter>

    <TableRow>
      <TableCell component="th" scope="row" colSpan={2}>
        Total:
      </TableCell>
      <TableCell numeric colSpan={1} className="quantitycell">${this.getTotalPrice()}</TableCell>
      <TableCell numeric colSpan={1} className="quantitycell"></TableCell>
    </TableRow>
     <Button onClick={this.clearcart.bind(this)}>clear order</Button>


    <TableRow>
      <TablePagination
        colSpan={3}
        count={this.state.myorder.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        // ActionsComponent={this.TablePaginationActionsWrapped}
      />
      {/* {console.log(this.state.rowsPerPage)} */}
    </TableRow>
  </TableFooter>
            </Table>

            {/* <CustomPaginationActionsTable/> */}
            </div>
</Card>
            </div>

          </div>




        </div>



      </div>
    );
  }
}

export default withAuth(Exclusives);
