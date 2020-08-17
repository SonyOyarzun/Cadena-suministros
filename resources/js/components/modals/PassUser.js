import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon,MDBBtn } from "mdbreact";

function PassUser(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const process = () => {

    if(document.getElementById('editUserForm.pass').value == 
    document.getElementById('editUserForm.confirmPass').value){

    axios({
      method: 'put',
      url: '/user/pass/',
      data: {
        id: document.getElementById('editUserForm.id').value,
        pass: document.getElementById('editUserForm.pass').value
      }
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });

    }else{
      alert('Las contraseñas no coinciden')
    }

  }

  return (
    <div>

      <MDBBtn tag="a" size="sm" gradient="blue" onClick={handleShow}>
      <MDBIcon icon="key" />
      </MDBBtn>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
          <Form.Group controlId="editUserForm.id">
              <Form.Label srOnly>ID</Form.Label>
              <Form.Control type='hidden' placeholder="ID" defaultValue={props.id} />
            </Form.Group>
            <Form.Group controlId="editUserForm.pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="Password" rows="3" />
            </Form.Group>
            <Form.Group controlId="editUserForm.confirmPass">
              <Form.Label>Repita Contraseña</Form.Label>
              <Form.Control type="Password" rows="3" />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
      </Button>
          <Button variant="primary" onClick={process}>
            Guardar Datos
      </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )


}

export default PassUser;