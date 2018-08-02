import React, { Component } from 'react';
import withAuth from '../services/withAuth';


class SearchBox extends Component {
  constructor(props){
    super(props)
      this.state={
      }
    }
    



      render(){
        return (
          <div>



<div class="button_box2">
<form class="form-wrapper-2 cf">
<input type="text" placeholder="Search by artist, title, etc..." required/>
<button type="submit">Search</button>
</form>
</div>


          
          </div>
        )
      }
      }
    export default SearchBox;