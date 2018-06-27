import React, { Component } from 'react';
import withAuth from '../services/withAuth';

const BASE = 'http://localhost:3000';

class Home extends Component {
  constructor(props){
    super(props)
      this.state={
        order: 'show',
        // orderpage:'',
        allvinyl: [],
        // myorder: [],
      }

  }

  componentWillMount(){
    // let userID = Auth.getUserId()

    return fetch(BASE + '/vinyls')
      .then((resp) => {
        return resp.json()
      })
      .then(APIinfo => {
        console.log("record data:")
        console.log(APIinfo)
        if(APIinfo.length ==0 ){
          console.log("TEST PASSED");
          let nodata = true
          this.props.history.push({
                pathname: '/log',
                state: {nodata: nodata}
          })
          // this.props.history.push('/log', nodata.true)
        } else{
        this.setState({
          allvinyl: APIinfo
        })
        }
})
}



toggleOrder(){
  let order
  let orderpage
  if(this.state.order == 'show'){
    orderpage=  <div className='inorder'>
      My Order: {this.state.myorder}
    </div>
    order = 'hide';
  }else {
    order = 'show';
  }
  this.setState({order: order, orderpage: orderpage})
}


addToOrder(element){
  let {myorder, orderpage} = this.state
  console.log('added to order' + element.id);
  myorder.push(element.price)
  console.log(this.state.orderpage)
    console.log(myorder)
  orderpage =  <div className='inorder'>
    My Order: {myorder.map((element,index)=>
    element)}
    </div>
this.setState({myorder: myorder, orderpage: orderpage})
}
  render() {
    return (
      <div>


        <div className="bigbox">
          <div className="mainpage">
            Scorpio Music Exclusives:

            {this.state.allvinyl.map((element,index)  =>

              <table onClick = {this.addToOrder.bind(this, element)}>
                <tr>{element.artist}</tr>
                <tr>{element.title}</tr>
                <tr>{element.label}</tr>
                <tr>{element.labelnum}</tr>
              </table>




          )}


            {/* {this.state.allvinyl} */}
          </div>

          <div className="order" onClick={this.toggleOrder.bind(this)}>

            {this.state.orderpage}



          </div>




        </div>



      </div>
    );
  }
}

export default withAuth(Home);
