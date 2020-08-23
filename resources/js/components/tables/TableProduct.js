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

    const { data } = this.props.location

    const params = {
      "path": data,
    }

    console.log('router data',{
      params
    })

    axios.get('json-api',{
      params
    })
    .then(response => {
      this.setState({ products: response.data})
     // console.log(response.data.result.links)
      console.log(response.data)
    }).catch(error => {
      alert("Error " + error)
    })

  }



  render() {


    let columns = []
    let preRows = []
    let rows = []
    let count = 0

    Object.keys(this.state.products).map((key, row) => (
  
      preRows = [],
      Object.keys(this.state.products[key]).map((key2, col) => (
      {...Object.keys(this.state.products[key]).length> count &&
        
        columns.push({
          label: key2,
          field: key2,
        })

      },
      
          preRows[key2]=this.state.products[row][key2],
          console.log('pre :',row,col,preRows) 
      )),
      console.log('push :',preRows),
      rows.push(preRows),
      

      console.log(rows),  
      count = count + 1
    ))



    let data = { 
      columns,
      rows
    };


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