import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";
import { data } from 'jquery';

function NewUser(props) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const process = () => {

    const BigchainDB = require('bigchaindb-driver')

    const alice = new BigchainDB.Ed25519Keypair()

    if(document.getElementById('newUserForm.pass').value == 
    document.getElementById('newUserForm.confirmPass').value){

    axios({
      method: 'post',
      url: '/user/new/',
      data: {
        name:  document.getElementById('newUserForm.name').value,
        email: document.getElementById('newUserForm.email').value,
        role:  document.getElementById('newUserForm.role').value,
        path:  document.getElementById('newUserForm.path').value,
        pass:  document.getElementById('newUserForm.pass').value,
        publicKey:   alice.publicKey,
        privateKey:  alice.privateKey
      }
    })
      .then((response) => {
        console.log('new user :',response);
        props.getData()
        alert(response.data)
      }, (error) => {
        console.log(error);
        alert(error)
      });

    }else{
      alert('Las contraseñas no coinciden')
    }

  }


  

  return (
    <div>
  
      <MDBBtn color="primary" outline rounded onClick={handleShow}>Nuevo Usuario</MDBBtn>
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newUserForm.name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="nombre completo"/>
            </Form.Group>
            <Form.Group controlId="newUserForm.email">
              <Form.Label>Mail</Form.Label>
              <Form.Control type="email" placeholder="name@example.com"  />
            </Form.Group>
            <Form.Group controlId="newUserForm.role">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" defaultValue={props.role}>
                <option value="P">Productor</option>
                <option value="D">Distribuidor</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="newUserForm.path">
              <Form.Label>Ruta</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="newUserForm.pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="Password"  rows="3"/>
            </Form.Group>
            <Form.Group controlId="newUserForm.confirmPass">
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