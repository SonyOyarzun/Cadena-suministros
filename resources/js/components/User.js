import React, { Component, Fragment } from 'react';

import {Card} from 'react-bootstrap';

import TableUser from './tables/TableUser'
import { getUser } from './tables/TableFunctions'



class User extends Component {

  constructor() {
    super()
    this.state = {
        user: []
    }
}

componentDidMount() {
    getUser().then(response => {
        this.setState({
            user: response
        })
    })
}

    render() {
      console.log('user:',this.state.user)
        return (
            <div>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Usuarios</Card.Title>
               <Card.Text>
               </Card.Text>
               <TableUser user={this.state.user}/>
            </Card.Body>
          </Card>
          </div>
        )
       
    }
    
}

export default User;











