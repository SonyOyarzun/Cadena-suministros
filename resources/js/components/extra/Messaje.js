import React, { Component, Fragment, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn, MDBAlert } from "mdbreact";

import SnackBar from '../extra/SnackBar'
import { render } from 'react-dom';

function PassUser(props) {

  const [alert, setAlert] = useState('');
  const [type, setType] = useState('');

  const textRef = useRef(null);

  const copyToClipboard = (e) => {

    textRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setAlert('ID de Transaccion copiada');
  };


  return (
    <div>

      {alert != '' &&
        <SnackBar alert={alert} type={type} />
      }

      <Modal show={props.show} onHide={props.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>


        <Modal.Body>
          <Form.Group controlId="messages">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control readOnly type="text" rows="3" maxLength="12" defaultValue={props.value} ref={textRef} />
          </Form.Group>



          {

            document.queryCommandSupported('copy') &&
            <div>
              <MDBBtn type="button" onClick={copyToClipboard} gradient="blue" rounded className="btn-block z-depth-1a">Copiar</MDBBtn>
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