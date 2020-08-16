import React, { Component } from 'react';

import axios from 'axios'

//import datable
import { MDBDataTableV5, MDBBadge } from 'mdbreact';

//importar modals
import EditUser from './modals/EditUser'
import NewUser from './modals/NewUser'
import PassUser from './modals/PassUser'
import DeleteUser from './modals/DeleteUser'


class TableUser extends Component {


  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {

    axios.get('user').then(response => {
      this.setState({ users: response.data })
    }).catch(error => {
      alert("Error " + error)
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
          label: 'Editar',
          field: 'edit',
          width: 100,
        },
        {
          label: 'Contraseña',
          field: 'pass',
          width: 100,
        },
        {
          label: 'Eliminar',
          field: 'delete',
          width: 100,
        }
      ],
      rows: [
        ...this.state.users.map((data, order) => (
          {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            edit: <EditUser name={data.name}/>,
            pass: <PassUser/>,
            delete: <DeleteUser/>
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
          data={data}
        />

      </div>
    )
  }

}


export default TableUser;