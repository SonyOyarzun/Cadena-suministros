import React, { Component,PropTypes, ButtonGroup } from 'react';

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
    let preRows = []
    let rows = []

    Object.keys(this.state.products).map((key, row) => (
  
      preRows = [],
      Object.keys(this.state.products[key]).map((key2, col) => (

        columns.push({
          label: key2,
          field: key2,
        }),
          preRows[key2]=this.state.products[row][key2],
          console.log('pre :',row,col,preRows) 
      )),
      console.log('push :',preRows),
      rows.push(preRows),
      

      console.log(rows)   
    ))

    let data = { 
      columns,
      rows
    };

   // console.log('dataJSON: product',data)

    return (
      <div>

        <MDBDataTableV5
          className='cust-table'
          responsive
          bordered
          hover
          btn
          data={data}
        />

      </div>
    )
  }

}

export default withRouter(TableUser);
//export default TableUser;