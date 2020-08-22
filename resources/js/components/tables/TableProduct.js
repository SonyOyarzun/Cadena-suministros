import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

//import datable
import { MDBDataTableV5, MDBBadge } from 'mdbreact';

//importar modals
import EditUser from '../modals/EditUser'
import NewUser from '../modals/NewUser'
import PassUser from '../modals/PassUser'
import DeleteUser from '../modals/DeleteUser'
import ProductUser from '../modals/ProductUser'

import {NavLink,Link, withRouter}  from 'react-router-dom';
import { Button, Navbar ,Nav, NavDropdown,Form,FormControl} from 'react-bootstrap';
class TableUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }

  }

  componentDidMount() {

    axios.get('user/list/').then(response => {
      this.setState({ products: response.data })
    }).catch(error => {
      alert("Error " + error)
    })

  }


  render() {

    let columns = []
    let rows = []
    let data = {}


    Object.keys(this.state.products).map((key, row) => (
      console.log('row:',row),
    
      Object.keys(this.state.products[key]).map((key2, col) => (
        console.log('row:',row,' col:',col,),
        columns = {...columns, label:key2},
        rows[key2]=this.state.products[key][key2]
        ))
    ))

    data = { 
      columns,
      rows
    };

    console.log('dataJSON',data)

    return (
      <div>

        <MDBDataTableV5
          className='cust-table'
          responsive
          bordered
          hover
          btn
          data={this.data}
        />

      </div>
    )
  }

}

export default withRouter(TableUser);
//export default TableUser;