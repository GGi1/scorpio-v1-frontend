import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
//MY IMPORTS
import {Select, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Card, Button, Icon, Table, TableHead,TableBody, TableCell, TableFooter, TablePagination, TableRow} from '@material-ui/core'
import Carousel from "nuka-carousel";

//MY CONSTS:
const BASE = 'http://localhost:3000';
const cart = localStorage.getItem( 'myorder' )
//END MY CONSTS


const drawerWidth = 240;

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
    // I added:
    backgroundColor: 'blue',
    display: 'flex',
    alignItems: 'flex-end',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      // duration: theme.transitions.duration.leavingScreen,
        duration: '10000ms',
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      // duration: theme.transitions.duration.enteringScreen,
        duration: '10000ms',
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
    color: 'black',
    justifyContent: 'baseline',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
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
      // duration: theme.transitions.duration.leavingScreen,
      duration: '10000ms',
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
      // duration: theme.transitions.duration.enteringScreen,
      duration: '10000ms',
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    anchor: 'right',
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
    slides: 4
//my state functions:






  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };


  //MY FUNCTIONS::
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

addToOrder(element){
  let {myorder} = this.state
  myorder.push(element)
  this.setState({myorder: myorder}, this.setmyorder)
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

//END MY FUNCTIONS

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>

          My Order
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
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

    return (
      <div className={classes.root}>

        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {/* Scorpio Music Distributors */}
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />



            <div className = "banner">EXCLUSIVES
            </div>

            <div className="bigbox">
               {/* <Carousel slidesToShow={this.state.slides} style={{height: '268px'}} width='100%' speed={800} slidesToScroll={4}>{this.getdivs()}</Carousel> */}

                    {/* <Button variant="outline"> Right </Button> */}





            </div>





            <Typography>{'You think water moves fast? You should see ice.'}</Typography>











          </main>
          {after}
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
