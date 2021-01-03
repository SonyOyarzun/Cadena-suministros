import React, { Component, Fragment, useState } from 'react';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";
import { changePass } from '../../access/UserFunctions';

import SnackBar from '../../components/extra/SnackBar'
import { render } from 'react-dom';

function PassUser(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setState] = useState({ id: props.id, pass: '', confirmPass: '' })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('Actualizar')

  const [alert, setAlert] = useState('');
  const [type, setType] = useState('');


  const onChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }
  // console.log('state ',state)

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('Cargando...')

    changePass(state).then(response => {
      setLoading(false)
      setMessage('Actualizar')
     // setAlert(response.message)
     // setType(response.type)
     alert(response.message)
    })
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
            <Form.Group controlId="passUserForm.pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name='pass' type="Password" rows="3" maxLength="12" onChange={onChange} defaultValue={state.pass} />
            </Form.Group>
            <Form.Group controlId="passUserForm.confirmPass">
              <Form.Label>Repita Contraseña</Form.Label>
              <Form.Control name='confirmPass' type="Password" rows="3" maxLength="12" onChange={onChange} defaultValue={state.confirmPass} />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
      </Button>
          <Button variant="primary" onClick={onSubmit}>
            {message}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )


}

export default PassUser;