import React, { Component } from 'react';
import withAuth from '../services/withAuth';
import PersistentDrawer from '../components/PersistentDrawer2';

class Main extends Component {
  constructor(props){
    super(props)
      this.state={
        slidediv: '',
      }
    }
slidediv(){
  console.log("slide div running");
  let {slidediv} = this.state
  // if(this.state.slidediv == ''){
    slidediv = <div className = "slidediv"> test </div>
  // }

  this.setState({slidediv: slidediv});
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


      render(){
        return (
          <div>


              <span id="hamburger" onClick={this.openNav.bind(this)}>&#9776;</span>


                <div id="main">
                  <h2>Exclusives</h2>
                  <p>Record Listing goes here</p>


              </div>

                  <div id="mySidenav" class="sidenav">
                    <a class="closebtn" onClick={this.closeNav.bind(this)}> &#9776;</a>

                    <div id="side-order">
                    Add items to your cart...
                  </div>
                  </div>

                  where is this
          </div>
        )
      }

}
export default Main
