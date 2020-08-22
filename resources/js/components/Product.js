import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';



class User extends Component {

    render() {
        return (
            <div>
            <Card>
            <NewUser/>
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
            data={data}
          />
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default User;











