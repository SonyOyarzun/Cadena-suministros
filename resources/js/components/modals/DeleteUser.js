import React, { useState } from 'react';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';

//Material Bootstrap
import { MDBIcon } from "mdbreact";

function DeleteUser(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const process = () => {

    axios({
      method: 'delete',
      url: '/user/delete/',
      data: {
        id: document.getElementById('editUserForm.id').value,
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
      <Button variant="primary" onClick={handleShow}>
        <MDBIcon far icon="edit" />
      </Button> 
    </div>
  )
}


export default DeleteUser;