import React, { Component, Fragment, useState , useEffect} from 'react';

import ReactDOM from 'react-dom';
import { newUser } from '../../access/UserFunctions';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

import SnackBar from '../../components/extra/SnackBar'
import { render } from 'react-dom';

function NewUser(props) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const BigchainDB = require('bigchaindb-driver')



  //const alice = new BigchainDB.Ed25519Keypair()

  //var keypair = new driver.Ed25519Keypair(bip39.mnemonicToSeed("yourString").slice(0, 32))

  const [state, setState] = useState({ id: '', name: '', email: '', role: 'A', path: '', pass: '', confirmPass: ''})

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('Crear usuario')

  const [alert, setAlert] = useState('');
  const [type, setType] = useState('');


  const onChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }
  //console.log('state ',state)

  useEffect( ()=>{

    let alice = new BigchainDB.Ed25519Keypair()
    setState({privateKey: alice.privateKey, publicKey: alice.publicKey});

 });
 

  const onSubmit = (e) => {
    e.preventDefault()
    render(<></>, document.getElementById('message'));
    setLoading(true)
    setMessage('Cargando...')


    newUser(state).then(response => {
      setLoading(false)
      setMessage('Crear usuario')
      setAlert(response.message)
      setType(response.type)
     // props.getData()
    })
  }


  return (
    <div>
      {alert != '' &&
        <SnackBar alert={alert} type={type} />
      }
      <MDBBtn color="primary" rounded onClick={handleShow}><MDBIcon icon="user-plus" /> Agregar Usuario</MDBBtn>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newUserForm.name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name='name' type="text" placeholder="nombre completo" maxLength="30" onChange={onChange} defaultValue={state.name} />
            </Form.Group>
            <Form.Group controlId="newUserForm.email">
              <Form.Label>Mail</Form.Label>
              <Form.Control name='email' type="email" placeholder="name@example.com" maxLength="30" onChange={onChange} defaultValue={state.email} />
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
              <Form.Control as="textarea" name='path' rows="3" maxLength="300" onChange={onChange} defaultValue={state.path} />
            </Form.Group>
            <Form.Group controlId="newUserForm.pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name='pass' type="Password" rows="3" maxLength="12" onChange={onChange} defaultValue={state.pass} />
            </Form.Group>
            <Form.Group controlId="newUserForm.confirmPass">
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

export default NewUser;

/**
 const bip39 = require('bip39')

const seed = bip39.mnemonicToSeed('seedPhrase').slice(0,32)
const alice = new BigchainDB.Ed25519Keypair(seed)

https://www.bigchaindb.com/developers/guide/tutorial-car-telemetry-app/

https://tutorials.bigchaindb.com/crab/create
 */