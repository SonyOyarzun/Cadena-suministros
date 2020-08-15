import React, { Component, useState, useRef,useEffect} from 'react';
import ReactDOM from 'react-dom'

import { Button, Card,Table,Row, Col} from 'react-bootstrap';
import axios from 'axios'

class User extends Component {

    constructor(props){
      super(props);
      this.state = {
        usuarios:[]
      }
    }

    componentDidMount(){

      axios.get('user').then(response=>{
    //    console.log(response.data[0])  
        this.setState({usuarios:response.data})
      }).catch(error=>{
        alert("Error "+error)
      })

    }

    render() {
        return (
                
<Card>
  <Card.Body>
    <Card.Title>Lista de Usuarios</Card.Title>
    <Card.Text>
      Seleccione un usuario para editar sus caracteristicas.
    </Card.Text>
    <Table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nombre</th>
                  <th>Mail</th>
                </tr>
              </thead>
              <tbody id="bodytable">
                  {this.renderList()}
              </tbody>
    </Table>
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
          </tr>
        )

      })

    }
}

if (document.getElementById('user')) {
    ReactDOM.render(<User/>, document.getElementById('user'));
}

export default User;