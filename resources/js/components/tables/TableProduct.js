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
      users: []
    }

  }

  componentDidMount() {
/*
    axios.get('user/list/').then(response => {
      this.setState({ users: response.data })
    }).catch(error => {
      alert("Error " + error)
    })


Object.keys(products).map((key, row) => (
  console.log('row:',row),

  Object.keys(products[key]).map((key2, col) => (
    console.log('row:',row,' col:',col,),
 // columns = {...columns, label:key2},
    rows[key2]=products[key][key2]
    ))
*/
  }


  render() {

    axios.get('user/list/').then(response => {
      this.setState({ users: response.data })
    }).catch(error => {
      alert("Error " + error)
    })


    let columns = []
    let rows = []
    let data = {}

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