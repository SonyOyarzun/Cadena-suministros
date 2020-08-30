import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';

import TableSend from './tables/TableSend'



class Send extends Component {

    render() {
        return (
            <div>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Envios</Card.Title>
               <Card.Text>
               </Card.Text>
               <TableSend/>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Send;