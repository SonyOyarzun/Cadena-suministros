import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
import { MDBIcon } from "mdbreact";

function DeleteUser(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

return (
    <div>
      <Button variant="primary" onClick={handleShow}>
       <MDBIcon far icon="trash-alt" />
      </Button>
    </div>
  )


}    

export default DeleteUser;