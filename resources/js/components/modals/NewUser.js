import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function NewUser(props) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const process = () => {

    if(document.getElementById('editUserForm.pass').value == 
    document.getElementById('editUserForm.confirmPass').value){

    axios({
      method: 'post',
      url: '/user/new/',
      data: {
        id: document.getElementById('editUserForm.id').value,
        name:  document.getElementById('editUserForm.name').value,
        email: document.getElementById('editUserForm.email').value,
        role: document.getElementById('editUserForm.role').value,
        path: document.getElementById('editUserForm.path').value,
        pass: document.getElementById('editUserForm.pass').value
      }
    })
      .then((response) => {
        console.log(response);
     //   alert(response.data)
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
        <MDBIcon icon="edit" />
      </MDBBtn>
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="editUserForm.message">
            </Form.Group> 
            <Form.Group controlId="editUserForm.id">
              <Form.Label srOnly>ID</Form.Label>
              <Form.Control type='hidden' placeholder="ID" />
            </Form.Group>
            <Form.Group controlId="editUserForm.name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="nombre completo"/>
            </Form.Group>
            <Form.Group controlId="editUserForm.email">
              <Form.Label>Mail</Form.Label>
              <Form.Control type="email" placeholder="name@example.com"  />
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
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="editUserForm.pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="Password"  rows="3"/>
            </Form.Group>
            <Form.Group controlId="editUserForm.confirmPass">
              <Form.Label>Repita Contraseña</Form.Label>
              <Form.Control type="Password"  rows="3"/>
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

export default NewUser;