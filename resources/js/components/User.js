import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';

import TableUser from './tables/TableUser'
import NewUser from './modals/NewUser';


class User extends Component {

    render() {
        return (
            <div>
            <Card>
            <NewUser/>
            <Card.Body>
              <Card.Title>Lista de Usuarios</Card.Title>
               <Card.Text>
               </Card.Text>
               <TableUser/>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default User;











