import React, { Component, useState, useRef,useEffect} from 'react';
import ReactDOM from 'react-dom'

import { Button, Card,Table,Row, Col} from 'react-bootstrap';
import axios from 'axios'


class Usuario extends Component {
    
    constructor(props){
      super(props);
      this.state = {
        producto:[]
      }
    }
    
    componentDidMount(){

axios({
    method: 'get',
    url: 'home',
    headers: { 
     'Access-Control-Allow-Origin': '*',
     'Content-Type': 'application/json',
            },
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
     
   }

render() {
        return (
         
         <div>
<Row>
<Col>

<Card>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
     {this.renderList()}
  </tbody>
</Table>
    
  </Card.Body>
</Card>

</Col>
</Row>
</div>
                
         
        );
    }

renderList(){

      return this.state.producto.map((data)=>{

          return (
          <tr>
            <td>{data.titulo}</td>
            <td>{data.descripcion}</td>
            <td>{data.precio}</td>
          </tr>
        )

      })

    }
  
}

export default Usuario;



if (document.getElementById('root')) {
    ReactDOM.render(<Usuario />, document.getElementById('root'));
}