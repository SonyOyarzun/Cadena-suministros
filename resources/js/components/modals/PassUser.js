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

    axios({
      method: 'put',
      url: '/user/pass/',
      data: {
        id:   props.id,
        pass: document.getElementById('passUserForm.pass').value,
        confirmPass: document.getElementById('passUserForm.confirmPass').value
      }
    })
      .then((response) => {
    //    console.log(response);
        alert(response.data)
      }, (error) => {
        console.log(error);
   //     alert(error.data)
      });


  }

  return (
    <div>

      <MDBBtn tag="a" size="sm" gradient="blue" onClick={handleShow}>
      <MDBIcon  icon="key" />
      </MDBBtn>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="passUserForm.pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="Password" rows="3" maxLength="12"/>
            </Form.Group>
            <Form.Group controlId="passUserForm.confirmPass">
              <Form.Label>Repita Contraseña</Form.Label>
              <Form.Control type="Password" rows="3" maxLength="12"/>
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