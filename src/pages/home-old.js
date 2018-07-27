import React, { Component } from 'react';
import withAuth from '../services/withAuth';
import {Select, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Card, Button, Icon, Table, TableHead,TableBody, TableCell, TableFooter, TablePagination, TableRow} from '@material-ui/core'
import CustomPaginationActionsTable from '../components/Table.js';
import TablePaginationActions from '../components/TablePaginationActions.js'
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from '../components/dialog';
// import Slider from "react-slick";
// import Responsive from "../components/slider/vinylslider"
import "../css/index.css";
import Carousel from "nuka-carousel";
import PersistentDrawer from '../components/PersistentDrawer';


//PERSISTANT DRAWER ------
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = '240 px';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});
//-----


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

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
};


class Home extends Component {
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
        totalprice: 0,
        myarray: ["2", "4", "6", "8", "10"],
        carousel: '',
        slides: 4,
        open: false,
        anchor: 'right',
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
    return fetch(BASE + '/vinyls')
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


getdivs(){
let mydivs =
this.state.allvinyl.map((element,index)  =>{
    return(

      <div className='itemcard2'>
        {/* <Card> */}
      <div className='record2' style={{backgroundImage: `url(/assets/images/${element.pic})`}}>
      <Icon style={{paddingRight: '6px'}}>add_shopping_cart</Icon>
      </div>

      {/* <div className="title">{element.title}</div>
      <div className="artist">{element.artist}</div>
      <div className="title">${element.price}</div> */}
      <div className="cartbutton2"> <Card> <Button  onClick = {this.addToOrder.bind(this, element)} variant="outlined" color="black" style={{border: 'none'}}><Icon style={{paddingRight: '6px'}}>add_shopping_cart</Icon>
      Add to Cart
  </Button>
</Card>

      </div>

      {/* <div className="labelandnum">{element.label}{element.labelnum}</div> */}
  {/* </Card> */}

    </div>

  )

  }

)

return mydivs
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
sliderdivs(){
  let div = []
  div = this.state.allvinyl.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((element,index)  =>
    {
      return(<Card className='itemcard'>
      <div className='record' style={{backgroundImage: `url(/assets/images/${element.pic})`}}>
      </div>
        <table>
      <div className="title">{element.title}</div>
      <div className="artist">{element.artist}</div>
      <div className="title">${element.price}</div>
      <div className="cartbutton">  <Button  onClick = {this.addToOrder.bind(this, element)} variant="outlined" color="primary"><Icon style={{paddingRight: '6px'}}>add_shopping_cart</Icon>
      Add to Cart
  </Button>

      </div>

      <tr className="labelandnum">{element.label}{element.labelnum}</tr>

    </table>

    </Card>
  )
  }

)
console.log(div)
return div
}
handleDrawerOpen = () => {
  this.setState({ open: true });
};

handleDrawerClose = () => {
  this.setState({ open: false });
};

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;
    const drawer = (
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        style={{backgroundColor: 'red', width: '800px'}}
        className='mydrawer'
        // classes={{
        //   paper: classes.drawerPaper,
        //  }}
      >
        {/* <div className={classes.drawerHeader}>  */}  <div>

          My Order
          <IconButton onClick={this.handleDrawerClose}>
            {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
             <ChevronRightIcon />
          </IconButton>
        </div>

        <Divider />

<div style={{width: '340px', backgroundColor: 'pink'}}>
  <Table>

  <TableBody>
  <TableRow>
  <TableCell>
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
  Test 1234
</div>



        {/* <List>{mailFolderListItems}</List> */}
        <Divider />
        {/* <List>{otherMailFolderListItems}</List> */}
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }





// console.log(TablePaginationActions);

    return (
      <div>
        {/* //BUTTON ONE: */}
        <div className="orderbutton" onClick={this.toggleOrder.bind(this)}><Button  href="#bottomorder" variant="contained" color="primary"><Icon style={{padding: '0px'}}>shopping_cart</Icon>
        <div>Total: ${this.getTotalPrice()}</div>
      </Button>
        </div>
        {/* //BUTTON TYPE TWO: */}
        {/* <div className="orderbutton"><Button  href="#bottomorder" variant="contained" color="primary"><Icon style={{padding: '0px'}}>shopping_cart</Icon>
        <div>Total: ${this.getTotalPrice()}</div>
        </Button>
        </div> */}



{/* <PersistentDrawer order={this.state.myorder}/> */}
<AppBar
  // className={classNames(classes.appBar, {
  //   [classes.appBarShift]: open,
  //   [classes[`appBarShift-${anchor}`]]: open,
  // })}
>
    <div className="fullwidthflexright">

  <Toolbar disableGutters={!open}>

      <div>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={this.handleDrawerOpen}
      // className={classNames(classes.menuButton, open && classes.hide)}
    >
      <MenuIcon />
    </IconButton>
    </div>

    <Typography variant="title" color="inherit" noWrap>

    </Typography>
  </Toolbar>
    </div>
</AppBar>


{before}
<main
  // className={classNames(classes.content, classes[`content-${anchor}`], {
  //   [classes.contentShift]: open,
  //   [classes[`contentShift-${anchor}`]]: open,
  // })}
>
  {/* <div
    // className={classes.drawerHeader}
  /> */}
  <Typography>{

    'You think water moves fast? You should see ice.'}</Typography>
</main>
{after}
testset










        <div className = "banner">EXCLUSIVES
        </div>

        <div className="bigbox">
           <Carousel slidesToShow={this.state.slides} style={{height: '268px'}} width='100%' speed={800} slidesToScroll={4}>{this.getdivs()}</Carousel>

                {/* <Button variant="outline"> Right </Button> */}





        </div>
        <div className="fullwidthflex">

<Card style={{width: '90%'}} id="bottomorder">

        <Table>
        <TableHead>
          <TableCell colSpan={4}>
              <div className="fullwidthflex">
          <Typography variant="title" id="tableTitle">
        My Order
      </Typography>
    </div>
      </TableCell>


          {/* <TableRow>
          <TableCell>
          </TableCell>
          </TableRow> */}


      </TableHead>
<TableBody>
<TableRow>
  <TableCell>
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
      </Card>

</div>
</div>


    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withAuth(Home);
