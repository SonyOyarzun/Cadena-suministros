import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon,MDBBtn } from "mdbreact";

function PassUser(props) {

  return (
    <div>

      <MDBBtn tag="a" size="sm" gradient="blue" onClick={props.handleShow}>
      <MDBIcon  icon="key" />
      </MDBBtn>


      <Modal show={props.show} onHide={props.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <Form.Group controlId="passUserForm.pass">
              <Form.Label>{props.label}</Form.Label>
              <Form.Control type="text" rows="3" maxLength="12" defaultValue={props.value}/>
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )


}

export default PassUser;