import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';

import TableUser from './TableUser'

class User extends Component {

    render() {
        return (
            <div>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Usuarios</Card.Title>
               <Card.Text>
                Seleccione un usuario para editar sus caracteristicas.
               </Card.Text>
               <User/>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default User;











