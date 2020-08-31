import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon,MDBBtn } from "mdbreact";


import CircularProgress from '@material-ui/core/CircularProgress';

function PassUser(props) {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="sm" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body>

<center>
        <CircularProgress/>
        <div>Cargando...</div>
        </center>
        </Modal.Body>
      </Modal>
    </div>
  )


}

export default PassUser;