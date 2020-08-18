import React, { useState } from 'react';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function DeleteUser(props) {



  const process = () => {

    axios({
      method: 'delete',
      url: '/user/delete/',
      data: {
        id: props.id,
      }
    })
      .then((response) => {
        console.log(response);
        alert(response.data)
      }, (error) => {
        console.log(error);
      });

  }



  return (
    <div>
      <MDBBtn tag="a" size="sm" gradient="blue" onClick={process}>
        <MDBIcon far icon="trash-alt" />
      </MDBBtn>  
    </div>
  )
}


export default DeleteUser;