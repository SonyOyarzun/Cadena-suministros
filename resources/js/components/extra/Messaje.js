import React, { Component, Fragment, useState, useRef } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn, MDBAlert } from "mdbreact";

function PassUser(props) {

  const [copySuccess, setCopySuccess] = useState(false);

  const textRef = useRef(null);

  const copyToClipboard = (e) => {
    textRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('ID de Transaccion copiada');
  };


  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>


        <Modal.Body>

        <MDBAlert color="success" onHide={true} >
        {copySuccess}
        </MDBAlert>

          <Form.Group controlId="message">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control readOnly type="text" rows="3" maxLength="12" defaultValue={props.value} ref={textRef} />
          </Form.Group>

          {

            document.queryCommandSupported('copy') &&
            <div>
              <MDBBtn onClick={copyToClipboard}>Copiar</MDBBtn>
            </div>
          }

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )


}

export default PassUser;