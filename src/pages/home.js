import React, { Component } from 'react';
import withAuth from '../services/withAuth';

// import {TextField, Select, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Card, Button, Icon, Table, TableHead,TableBody, TableCell, TableFooter, TablePagination, TableRow} from '@material-ui/core'
import {TextField, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Card, Button, Icon, TableCell, TableFooter, TablePagination, TableRow} from '@material-ui/core'


import TablePaginationActions from '../components/TablePaginationActions.js'

// import AlertDialog from '../components/dialog';
// import jQuery from 'jquery';
// import ReactDOM from 'react-dom';


//****************************************************************************************************************

// const reducer = (accumulator, currentValue) => accumulator + currentValue;



const BASE = 'https://scorpio-music-backend-api.herokuapp.com';
// const BASE = 'http://localhost:3000';
// const cart = localStorage.getItem( 'myorder' )
let bottomhit=0

//****************************************************************************************************************

class myFootable extends Component {
    constructor(props){
    super(props)
      this.state={
        order: 'show',
        // orderpage:'',
        allvinyl: [],
        myorder: [],
        myorderpage: '',
        rowsPerPage: 10,
        page: 0,
        count: 1,
        open: [],
        openQuantitySelect: [],
        totalprice: 0,
        pageSizeLength:10,
        search: '',
        StashedfilteredItems: [],
        filteredItemsOnReturn: [],
        searchparams: [],
        searchresultline: '',
        orderdisplay: '',
        width: 0,
        height: props.height


      }

      // this.myTablePaginationActions = new TablePaginationActions()

  }

  componentWillMount(){
    //
    // console.log(this.myTablePaginationActions);
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
        if(APIinfo.length ===0 ){

          // this.props.history.push('/log', nodata.true)
        } else{
          console.log(myorder[0]);
        this.setState({
          allvinyl: APIinfo, myorder: myorder, filteredItemsOnReturn: APIinfo
        }
        , this.isThereAnOrder


      )
        }
})
}


componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
}


handleScroll(event) {
    let scrollTop = event.srcElement.body.scrollTop,
        itemTranslate = Math.min(0, scrollTop/3 - 60);
        // console.log(itemTranslate)
    this.setState({
      transform: itemTranslate
    })
  }

updatehit(){
  console.log("update hit running")
   this.setState({ width: window.innerWidth, height: window.innerHeight });
}
//
// getInitialState() {
//     var myorder = localStorage.getItem( 'myorder' );
//     // console.log(myorder);
//     var orderdiplay = '';
//     if(myorder == 'undefined'){
//       myorder = [];
//       var orderdisplay = "none";
//     } else{
//       console.log('there');
//       var orderdisplay = "none";
//       }
//       console.log(orderdisplay);
//     this.setState( { myorder: myorder, orderdisplay: orderdisplay} );
// }


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

isThereAnOrder(){
  var display = ''
  console.log(this.state.myorder.length)
  if(this.state.myorder.length < 1){
    display = "none"
  }
  else {
    display = ""
  }
console.log(display)
  this.setState({orderdisplay: display})


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
   this.setState({myorder: []}, this.isThereAnOrder)
}

handleChangePage = (event, page) => {
  this.setState({ page });
};

// toggleOrder(){
//   let myorderpage
//
//   if(this.state.myorderpage == 'flex'){
//     myorderpage = 'none'
//   } else {
//     myorderpage = 'flex'
//   }
//
//   this.setState({myorderpage: myorderpage})
// }


addToOrder(element){
  let {myorder} = this.state
  myorder.push(element)
  this.setState({myorder: myorder, orderdisplay: ''}, this.setmyorder)
}




handleChangeRowsPerPage = event => {
  this.setState({ rowsPerPage: event.target.value });
}

removeItem(element, index){
  let {myorder} = this.state
  myorder.splice(index, 1)
  this.setState({myorder: myorder}, this.setmyorder, this.isThereAnOrder, this.handleClose(element,index)
)
}

handleClickOpen = (element,index) => {
let {open} = this.state
open[index] = true
  this.setState({ open: open});
};


enterquantity = (element,index) => {
let {openQuantitySelect} = this.state
openQuantitySelect[index] = true
  this.setState({ openQuantitySelect: openQuantitySelect});
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

// componentDidUpdate(prevProps, prevState) {
//   // table initialization
//   jQuery(ReactDOM.findDOMNode(this.refs.productstable)).footable();
// }
//
//
// componentDidMount(){
//               $('#sampleTable').footable({
//                     "columns": ["Col 1", "Col 2"],
// 		                    "rows": ["Row 1", "Row 2"]
//             });
//           }
//
//
//     componentDidUpdate(prevState,prevProps){
//   if(prevState.pageSizeLength!=this.state.pageSizeLength)
//   FooTable.get('#sampleTable').pageSize(this.state.pageSizeLength);
//   }
SearchEvent(event){
  // console.log(event.target.value)
  // let {searchparams} = this.state
  // // let {StashedfilteredItems} = this.state
  // let StashedfilteredItems = this.state.allvinyl.filter((item)=>{
  //     return (item.artist.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.label.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
  //     })
  // console.log(event.target.value)

// console.log(event.key)
//   searchparams.push(event.target.value)
//   searchparams.join("")
//   console.log(searchparams)

  let searchword = event.target.value



  this.setState({search: event.target.value.substr(0,20), searchparams: searchword})
}

catchReturn(){
  let {searchparams, searchresultline} = this.state
  let StashedfilteredItems = this.state.filteredItemsOnReturn;
  if (searchparams.length > 1){
  searchresultline = <div>Search Results for "{searchparams}"...  <a onClick ={this.undosearch.bind(this)}>undo</a></div>
  // let searchword =  searchparams
  // searchword.split('')
  StashedfilteredItems = this.state.allvinyl.filter((item)=>{
   return (item.artist.toLowerCase().indexOf(searchparams.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(this.state.searchparams.toLowerCase()) !== -1 || item.label.toLowerCase().indexOf(this.state.searchparams.toLowerCase()) !== -1)
     })

}
  // console.log(StashedfilteredItems)


  this.setState({filteredItemsOnReturn: StashedfilteredItems, searchresultline: searchresultline})

}

undosearch(){
  this.setState({search: '', searchparams: '', searchresultline: '', filteredItemsOnReturn: this.state.allvinyl})
}


openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("hamburger").style.display = "none";
}

closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
    document.getElementById("hamburger").style.display = "";
}


handleChange(event, element, index){
  console.log(event.target)
    console.log(event)
      console.log(element)
        console.log(index)
    // this.setState({ [event.target.name]: event.target.value });
  };


  gotocheckout(){
    this.props.history.push({
      pathname: '/checkout',
      state: {myorder: this.state.myorder}
})
  }

render() {

    window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          bottomhit ++
          console.log(bottomhit)
        }

      }

    //
    // window.onscroll = function(ev) {
    // if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    //     // alert("you're at the bottom of the page");

    //     // console.log(this.state)
    //
    //       bottomhit ++
    //       console.log(bottomhit)
    //       // this.setState({bottomhit:bottomhit})
    //     }
    //     return bottomhit
    //     // change filteredItemsOnReturn from only 100 items to 200 items, 200 items, etc..
    //   }
    //
    //   console.log(bottomhit)

    // let StashedfilteredItems = this.state.allvinyl.filter((item)=>{
    //   return (item.artist.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.label.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
    // }
    //
    //
    // )
  //
  // let StashedfilteredItems = this.state.allvinyl
  // console.log(StashedfilteredItems)
// console.log(TablePaginationActions);
let altdisplay = "none";
if(this.state.orderdisplay === "none"){
  console.log("this is running")
  altdisplay = ""
  console.log(altdisplay)
}

    return (
      <div>
        <div>


            <span id="hamburger" onClick={this.openNav.bind(this)}>&#9776;</span>


              <div id="main">

                {/* <div className = "banner"><b>EXCLUSIVES</b></div> */}
                <div className = "banner2"><b>EXCLUSIVES</b></div>

        {/*
                      IF I WANT TO HAVE A TABLE AND REMOVE CERTAIN COLUMNS AT CERTAIN SIZE WINDOWS/MEDIA: */}
                               {/* <th data-breakpoints="xs">Description</th>
                               <th data-breakpoints="xs sm">Quantity</th> */}

        {this.state.searchresultline}




                <div className="bigbox">



            <div className="mainpage">
        {/* <Button variant="outline"> LEFT </Button> */}

{/* LIMIT THE FILTEREDITEMSONRETURN (from search) BASED ON NUMBER OF TIMES BOTTOM OF BROWSWER IS HIT: */}


                    {this.state.filteredItemsOnReturn.slice(0, 35*(bottomhit+1)).map((element,index)  =>
                      <Card className='itemcard'>
{/* TO GET PHOTO NAME UNCOMMENT NEXT LINE: */}
                   {/* {  console.log(`url(/assets/images/${element.title.replace(/[^a-zA-Z0-9 ]/g, "").substr(0,5).split(" ").join("_")}${element.artist.replace(/[^a-zA-Z0-9]/g, "").split(' ').join('_')}.jpg`)  } */}
                        {/* <div className='record' style={{backgroundImage: `url(/assets/images/${element.pic})`}}> */}
                        <div className='record' style={{backgroundImage: `url(/assets/images/${element.title.replace(/[^a-zA-Z0-9 ]/g, "").substr(0,5).split(" ").join("_")}${element.artist.replace(/[^a-zA-Z0-9]/g, "").split(' ').join('_')}.jpg`    }}>
                        </div>
                          <table>
                        <div className="title">{element.title}</div>
                        <div className="artist">{element.artist}</div>
                        <div className="title">${parseInt(element.price).toFixed(2)}</div>
                        <div className="quantityline">
                        Quantity: <input type="number" defaultValue={1} min={1} style={{width: "30px"}}/>
</div>
                        {/* <Select
                                    value={this.state.age}
                                    onChange={this.handleChange.bind(this, element, index)}

                                  >

            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
          </Select> */}


                        {/* <Select
                                   native
                                   value={this.state.}
                                   onChange={this.handleChange.bind(this)}
                                   inputProps={{
                                     name: 'age',
                                     id: 'age-native-simple',
                                   }}
                                 >



                                   <option value={1}>1</option>
                                   <option value={2}>2</option>
                                   <option value={3}>3</option>
                                   <option value={4}>4</option>
                                   <option value={5}>5</option>
                                   <option value={6}>6</option>
                                   <option value={7}>7</option>
                                   <option value={8}>8</option>
                                   <option value={9}>9</option>
                                 </Select> */}




                        <div className="cartbutton">

                           <Button style={{background: 'linear-gradient(0deg, #fc7a1a 0%, #fcb713 100%)'}} onClick = {this.addToOrder.bind(this, element)} variant="outlined" color="black"><Icon style={{paddingRight: '6px'}}>add_shopping_cart</Icon>

                        {/* <Button style={{backgroundColor: '#0b05ff82'}} onClick={this.enterquantity.bind(this,element,index)} variant="outlined" color="black"><Icon style={{paddingRight: '6px'}}>add_shopping_cart</Icon> */}

{/* onClick={this.handleClickOpen.bind(this,element,index)} */}
                        Add to Cart


                    </Button>

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
                        </div>
                        <tbody>
                        <tr className="labelandnum">{element.label}{element.labelnum}</tr>
</tbody>
                      </table>

                      </Card>
                  )}
                  </div>


            </div>

{/********** SIDE BAR *************/}
                <div id="mySidenav" className="sidenav">
                  <a className="closebtn" onClick={this.closeNav.bind(this)}> &#9776;</a>
                  <div id="orderheader">

                  </div>


                  <div id="side-order">

                    <div id="alt-message" style={{display: altdisplay}}>
                    Add items to your cart...
                    </div>

                  <div>
                    {/* <div className='inorder'> */}

                        <div id='ordervis' style={{display: this.state.orderdisplay}}>
{/* <div> */}

                                <Typography variant="title" id="tableTitle" style={{position: 'center', display: 'flex', justifyContent: 'center'}}>
                                  My Order
                                </Typography>


<table className = "side-order-table">
  <tbody>
  <tr className = "side-order-table-toprow">
    <td className = "side-order-table-borderbottom">
        Title
    </td>
    <td className = "side-order-table-borderbottom">
        Quantity
    </td>
    <td className = "side-order-table-borderbottom">
      Price
    </td>
    <td className = "side-order-table-borderbottom">
    </td>
  </tr>

  {this.state.myorder.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((element,index)=>

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
</tbody>
    </table>





















                <TableFooter>

                <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                Total:
                </TableCell>
                <TableCell numeric colSpan={1} className="quantitycell">${this.getTotalPrice()}</TableCell>
                <TableCell numeric colSpan={1} className="quantitycell"></TableCell>
                </TableRow>
                <Button onClick={this.clearcart.bind(this)}>clear order</Button>
                <Button href="/checkout"
          >Checkout</Button>
                 <Button onClick={this.gotocheckout.bind(this)}
          >Checkout</Button>
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


                    {/* </div> */}

                    </div>

                  {/* </div> */}
                {/* //ORDER above */}

                  {/* END OF ADD ITEMS TO CART */}
                </div>

              </div>
                </div>


        </div>







        <div className="top-search-box">




        <TextField
                id="search-field"
                label="Search"
                style={{width: '200px', fontSize: '10px'}}
                value={this.state.search}
                onChange={this.SearchEvent.bind(this)}
                onKeyPress={(ev) => {
                  // console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter') {
                    this.catchReturn()
                    ev.preventDefault();
                  }}}
                margin="normal"
              />




              <div className="searchbutton" onClick={this.catchReturn.bind(this)}>
                <Icon style={{paddingRight: '6px', color: 'black'}}>search</Icon>
              </div>
              </div>
        {/* <input type="text" placeholder="Search Vinyl" value={this.state.search} onChange={this.SearchEvent.bind(this)}/> */}






{/* ORDER BUTTON  */}
          {/* <div className="orderbutton" onClick={this.toggleOrder.bind(this)}><Button variant="contained" color="primary"><Icon style={{padding: '0px'}}>shopping_cart</Icon>
          <div>Total: ${this.getTotalPrice()}</div>
        </Button> */}
            {/* <div className="ordertext">my order
      </div> */}
          {/* </div> */}
{/* ORDER BUTTON END */}







        </div>


        {/* <input type="text" value={this.state.search} onChange={this.SearchEvent.bind(this)}/> */}
      </div>
    );
  }
}


export default withAuth(myFootable);
