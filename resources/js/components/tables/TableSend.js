import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

//import datable
import { MDBDataTableV5, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact';

//importar modals
import EditUser from '../modals/EditUser'



import {NavLink,Link, withRouter}  from 'react-router-dom';


class TableUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.handleLink = this.handleLink.bind(this);
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
  }

  getData(){

    axios.get('chain/list').then(response => {
      this.setState({ users: response.data })
      console.log(this.state.users)
    }).catch(error => {
      alert("Error " + error)
    })

  }


  componentDidMount() {

    this.getData()

  }

  handleLink(path,data) {
    this.props.history.push({
      pathname: path,
      data: data // your data array of objects
    })
  }

  render() {

    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'ID',
          },
        },
        {
          label: 'Nombre',
          field: 'name',
          width: 150,
        },
        {
          label: 'Email',
          field: 'email',
          width: 200,
        },
        {
          label: 'Rol',
          field: 'role',
          sort: 'asc',
          width: 100,
        },
        {
          label: '',
          field: 'edit',
        }, 
        {
          label: '',
          field: 'pass',
        },
        {
          label: '',
          field: 'delete',
        },
        {
          label: '',
          field: 'product',
        },
      ],
      rows: [
        ...this.state.users.map((data, order) => (
          {
            id: (
              <MDBBadge pill color='primary' className='p-1 px-2' key={order} searchvalue={order}>
                ID: {data.id}
              </MDBBadge>
            ),
            name:   data.name,
            email:  data.email,
            role:   data.role,
               
          }
        ))
      ]
    };

    return (
      <div>
        <MDBDataTableV5
          className='cust-table'
          responsive
          bordered
          hover
          btn
          sortable={false}
          data={data}
        />

      </div>
    )
  }

}

export default withRouter(TableUser);

