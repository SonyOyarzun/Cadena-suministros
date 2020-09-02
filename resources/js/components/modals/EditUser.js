import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function EditUser(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const process = () => {

    axios({
      method: 'put',
      url: '/user/edit/',
      data: {
        id:    props.id,
        name:  document.getElementById('editUserForm.name').value,
        email: document.getElementById('editUserForm.email').value,
        role:  document.getElementById('editUserForm.role').value,
        path:  document.getElementById('editUserForm.path').value
      }
    })
      .then((response) => {
        console.log(response);
        props.getData()
        alert(response.data)
      }, (error) => {
        console.log(error);
      });

  }



  return (
    <div>
      <MDBBtn tag="a" size="sm" gradient="blue" onClick={handleShow}>
       <MDBIcon far icon="edit" />
      </MDBBtn>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="editUserForm.message">
            </Form.Group>
            <Form.Group controlId="editUserForm.name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="nombre completo" defaultValue={props.name} maxLength="30"/>
            </Form.Group>
            <Form.Group controlId="editUserForm.email">
              <Form.Label>Mail</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" defaultValue={props.email} maxLength="30"/>
            </Form.Group>
            <Form.Group controlId="editUserForm.role">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" defaultValue={props.role}>
                <option value="P">Productor</option>
                <option value="D">Distribuidor</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editUserForm.path">
              <Form.Label>Ruta</Form.Label>
              <Form.Control as="textarea" rows="3" defaultValue={props.path} maxLength="300"/>
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

export default EditUser;