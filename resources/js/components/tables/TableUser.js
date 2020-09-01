import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

//import datable
import { MDBDataTableV5, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact';

//importar modals
import EditUser from '../modals/EditUser'
import NewUser from '../modals/NewUser'
import PassUser from '../modals/PassUser'
import DeleteUser from '../modals/DeleteUser'

import Load from '../extra/Load'


import {NavLink,Link, withRouter}  from 'react-router-dom';


class TableUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    }
    this.handleLink = this.handleLink.bind(this);
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
  }

  getData(){

    axios.get('user/list/').then(response => {
      this.setState({ users: response.data })
   //   console.log(this.state.users)
    }).catch(error => {
      alert("Error " + error)
    })

  }


  componentDidMount() {

    this.getData()

    demoAsyncCall().then(() => this.setState({ loading: false }));

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
            edit:   <EditUser id={data.id} name={data.name} email={data.email} role={data.role} path={data.path} getData={this.getData}/>,
            pass:   <PassUser id={data.id} />,
            delete: <DeleteUser id={data.id} getData={this.getData}/>,
            product:<MDBBtn tag="a" size="sm" gradient="blue" onClick={process} onClick={()=>this.handleLink("Product",data.path)}>
                    <MDBIcon icon="shopping-cart"/>
                    </MDBBtn> 
            
           
          }
        ))
      ]
    };

    const { loading } = this.state;
    
      if(loading) { // if your component doesn't have to wait for an async action, remove this block 
        return <Load/>; // render null when app is not ready
      }else{

    return (
      <div>
        <div><NewUser getData={this.getData}/></div>
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

}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

export default withRouter(TableUser);

