import React, { Component, useState, useRef,useEffect} from 'react';
import ReactDOM from 'react-dom'

import { Button, Card,Table,Row, Col, ButtonGroup} from 'react-bootstrap';
import axios from 'axios'

//importar modals
import EditUser from './modals/EditUser'
import NewUser from './modals/NewUser'
import PassUser from './modals/PassUser'
import DeleteUser from './modals/DeleteUser'

import TableUser from './TableUser'


class User extends Component {

    constructor(props){
      super(props);
      this.state = {
        usuarios:[]
      }
    }

    componentDidMount(){

      axios.get('user').then(response=>{
  //      console.log(response.data[0])  
        this.setState({usuarios:response.data})
      }).catch(error=>{
        alert("Error "+error)
      })

    }

    render() {
//se recibe la variable del state y se envia al componente        
const { usuarios } = this.state;

console.log('antes')
console.log(usuarios)

        return (
         
<Card>
  <Card.Body>
    <Card.Title>Lista de Usuarios</Card.Title>
     <Card.Text>
      Seleccione un usuario para editar sus caracteristicas.
     </Card.Text>
     <TableUser arreglo={usuarios}/>
  </Card.Body>
</Card>
        );
    }

    renderList(){

      return this.state.usuarios.map(data =>{

        return(
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.role}</td>
            <td>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
            <EditUser id={data.id} name={data.name} email={data.email} role={data.role} path={data.path}/>
            <PassUser id={data.id} name={data.name} email={data.email} role={data.role} path={data.path}/>
            <DeleteUser id={data.id} name={data.name} email={data.email} role={data.role} path={data.path}/>
            </ButtonGroup>
            </td>        
          </tr>
        )

      })

    }
}

if (document.getElementById('user')) {
    ReactDOM.render(<User/>, document.getElementById('user'));
}

export default User;