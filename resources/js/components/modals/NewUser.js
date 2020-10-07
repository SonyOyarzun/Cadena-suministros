import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { newUser } from '../../access/UserFunctions';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";
import { data } from 'jquery';

function NewUser(props) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const BigchainDB = require('bigchaindb-driver')
  const alice = new BigchainDB.Ed25519Keypair()

  const [state, setState] = useState({ id: '' , name: '' , email: '',role: '', path: '', pass: '', confirmPass: '', privateKey: alice.privateKey, publicKey: alice.publicKey})

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('Actualizar')


  const onChange=(e) =>{
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState,[name]: value }));
  }
  console.log('state ',state)

  const onSubmit=(e) => {
    e.preventDefault()

    setLoading(true )
    setMessage('Cargando...')


    newUser(state).then(res => {
      props.getData()
      setLoading(false)
      setMessage('Actualizar')
    })
  }


  return (
    <div>

      <MDBBtn color="primary" rounded onClick={handleShow}><MDBIcon icon="user-plus" /> Agregar Usuario</MDBBtn>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newUserForm.name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name='name' type="text" placeholder="nombre completo" maxLength="30"  onChange={onChange} defaultValue={state.name}/>
            </Form.Group>
            <Form.Group controlId="newUserForm.email">
              <Form.Label>Mail</Form.Label>
              <Form.Control name='email' type="email" placeholder="name@example.com" maxLength="30" onChange={onChange} defaultValue={state.email}/>
            </Form.Group>
            <Form.Group controlId="newUserForm.role">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" name='role' onChange={onChange} defaultValue={state.role}>
                <option value="A">Administrador</option>
                <option value="U">Usuario</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="newUserForm.path">
              <Form.Label>Ruta</Form.Label>
              <Form.Control as="textarea" name='path' rows="3" maxLength="300" onChange={onChange} defaultValue={state.path}/>
            </Form.Group>
            <Form.Group controlId="newUserForm.pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name='pass' type="Password" rows="3" maxLength="12" onChange={onChange} defaultValue={state.pass}/>
            </Form.Group>
            <Form.Group controlId="newUserForm.confirmPass">
              <Form.Label>Repita Contraseña</Form.Label>
              <Form.Control name='confirmPass' type="Password" rows="3" maxLength="12" onChange={onChange} defaultValue={state.confirmPass}/>
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

export default NewUser;