import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { editUser } from '../../access/UserFunctions'
//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function EditUser(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setState] = useState({ id: props.id, name: props.name ,email:props.email,role: props.role, path: props.path, loading: false , message: 'Actualizar'})




  const onChange=(e) =>{
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState,[name]: value }));
  //setState(currentTarget => ({ ...currentTarget,[name]: value }));
  //  console.log(e.currentTarget);
    console.log('name',name,'value',value)
  }

  const onSubmit=(e) => {
    e.preventDefault()

    setState({ loading: true })
    setState({ message: 'Cargando...' })

    const user = {
      id:     state.id,
      name:   state.name,
      email:  state.email,
      role:   state.role,
      path:   state.path
    }
    console.log('user ',user)
  //  console.log('state ',state)

    editUser(user).then(res => {
      setState({ loading: false })
      setState({ message: 'Restablecer' })
    })
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
              <Form.Control name='name' type="text" placeholder="nombre completo" defaultValue={state.name} maxLength="30" onChange={onChange}/>
            </Form.Group>
            <Form.Group controlId="editUserForm.email">
              <Form.Label>Mail</Form.Label>
              <Form.Control name='email' type="email" placeholder="name@example.com" defaultValue={state.email} maxLength="30" onChange={onChange}/>
            </Form.Group>
            <Form.Group controlId="editUserForm.role">
              <Form.Label>Role</Form.Label>
              <Form.Control name='role' as="select" defaultValue={state.role} onChange={onChange}>
                <option value="A">Administrador</option>
                <option value="U">Usuario</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editUserForm.path">
              <Form.Label>Ruta</Form.Label>
              <Form.Control name='path' as="textarea" rows="3" defaultValue={state.path} maxLength="300" onChange={onChange}/>
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button name='message' variant="primary" onClick={onSubmit}>
            {state.message}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )


}

export default EditUser;