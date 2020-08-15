import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';


function PassUser(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Editar usuario
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
<Form>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Nombre</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" value={props.name}/>
    <Form.Label>Mail</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" value={props.email}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Role</Form.Label>
    <Form.Control as="select" defaultValue={props.role}>
      <option value="P">Productor</option>
      <option value="D">Distribuidor</option> 
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Ruta</Form.Label>
    <Form.Control as="textarea" rows="3" value={props.path}/>
  </Form.Group>
</Form>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar Datos
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )


}    

export default PassUser;