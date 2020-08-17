import React, { useState } from 'react';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function DeleteUser(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const process = () => {

    axios({
      method: 'delete',
      url: '/user/delete/',
      data: {
        id: document.getElementById('id').value,
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
      <input id="id" type="hidden" Value={props.id}/>
    </div>
  )
}


export default DeleteUser;