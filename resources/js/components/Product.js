import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';

//import datable
import { MDBDataTableV5, MDBBadge } from 'mdbreact';




class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }

    const params = {
      "path": props.path,
    }

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    }

    let columns = []
    let rows    = []

    content = {};

  }

  

  

  //json-api
  componentDidMount() {
    axios.get('/user/list/',{
      params,
      headers
    }).then(response => {
      setProducts(response.data);
      console.log(response.data)
    }).catch(error => {
      alert("Error " + error)
    })

    Object.keys(products).map((key, row) => (
      console.log('row:',row),
    
    
      Object.keys(products[key]).map((key2, col) => (
        console.log('row:',row,' col:',col,),
     // columns = {...columns, label:key2},
        rows[key2]=products[key][key2]
        ))
      
    ))

    content = { 
      columns,
      rows
    };
  }










    render() {
        return (
            <div>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Productos</Card.Title>
               <Card.Text>
               </Card.Text>
          <MDBDataTableV5
            className='cust-table'
            responsive
            bordered
            hover
            btn
            data={content}
          />
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default User;











