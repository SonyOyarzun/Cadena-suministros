import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';

import TableUser from './tables/TableUser'
import NewUser from './modals/NewUser';

class User extends Component {

  constructor(props) {
    super(props);
  //  this.reference = React.createRef();
  //  this.referenceGetData= this.referenceGetData.bind(this); //permitira enviar elevento getData a componente hijo
  }

  referenceGetData(){
    // trae function desde el hijo
  //  this.reference.getData();
   // alert('lol')
   //console.log(this.reference)
  }

//getData={this.referenceGetData}
    render() {
        return (
            <div>
            <Card>
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











