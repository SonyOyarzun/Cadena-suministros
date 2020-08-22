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
    this.handleLink = this.handleLink.bind(this);
  }

  componentDidMount() {

    axios.get('user/list/').then(response => {
      this.setState({ users: response.data })
    }).catch(error => {
      alert("Error " + error)
    })

  }

  handleLink(path) {
    this.props.history.push(path);
  }

  render() {

    const data = {
   

    console.log('dataJSON',data)

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