import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';

import TableMyReception from './tables/TableMyReception'



class Receive extends Component {

    render() {
        return (
            <div>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Productos en Posesión</Card.Title>
               <Card.Text>
               </Card.Text>
               <TableMyReception/>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Receive;