import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';

import TableReceive from './tables/TableReceive'



class Receive extends Component {

    render() {
        return (
            <div>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Envios pendientes de Recepcion</Card.Title>
               <Card.Text>
               </Card.Text>
               <TableReceive/>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Receive;