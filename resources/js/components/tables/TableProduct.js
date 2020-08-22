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
    let rows = []
   // let data = {}


    Object.keys(this.state.products).map((key, row) => (
    //  console.log('row:',row,'key1 :',key),
    
      Object.keys(this.state.products[key]).map((key2, col) => (
   //     console.log('row:',row,' col:',col,'key2 :',key2),
       
        columns.push({
          label: key2,
          field: key2,
        }),
        rows.push({
          id :    key2,
          name:   key2,
          email:  key2,
          role:   key2,
        })

       // rows[key2]=this.state.products[key][key2]
        ))
    ))

/*
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
      //      label: 'Editar',
      field: 'edit',
      width: 20,
    },
    {
      //      label: 'Contraseña',
      field: 'pass',
      width: 20,
    },
    {
      //      label: 'Eliminar',
      field: 'delete',
      width: 20,
    },
    {
      //      label: 'Eliminar',
      field: 'product',
      width: 20,
    }
  ],
  rows: [
    ...Object.keys(this.state.products).map((key, order) => (
       Object.keys(this.state.products[key]).map((key2, order2) => (
      {
        key2: (
          <MDBBadge pill color='primary' className='p-1 px-2' key={order} searchvalue={order}>
            ID: {rows[key2]=this.state.products[key][key2]}
          </MDBBadge>
        ),
        name:  rows[key2]=this.state.products[key][key2],
        email: rows[key2]=this.state.products[key][key2],
        role:  rows[key2]=this.state.products[key][key2]
,
      }
      ))
    ))
  ]
};

*/
   /*
    console.log('products',this.state.products)

    rows= [
     {...this.state.products.map((data, order) => (
        {
          id: (
            <MDBBadge pill color='primary' className='p-1 px-2' key={order} searchvalue={order}>
              ID: {data.id}
            </MDBBadge>
          ),
          name: data.name,
          email: data.email,
          role: data.role,
        }
        ))
     }
    ]

*/

    //crea un function para arrays llamado unique
    Array.prototype.unique=function(a){
      return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
    });

    //columns.unique()

    let data = { 
      columns,
      rows
    };

    console.log('dataJSON: product',data)

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