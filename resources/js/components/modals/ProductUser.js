import React, { Component, Fragment, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon } from "mdbreact";

function ProductUser(props) {

  const [show, setShow]   =  useState(false);
  const [users, setUsers] =  useState(false);
  const handleClose = ()  => setShow(false);
  const handleShow = ()   => setShow(true);

  const process = () => {

    axios.get('user/list/').then(response => {
      setUsers(response.data)
    }).catch(error => {
      alert("Error " + error)
    })

  }

  const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'ID',
        },
      },
      {
        label: 'Nombre',
        field: 'name',
        width: 150,
      },
      {
        label: 'Email',
        field: 'email',
        width: 200,
      },
      {
        label: 'Rol',
        field: 'role',
        sort: 'asc',
        width: 100,
      },
      {
        //      label: 'Editar',
        field: 'edit',
        width: 20,
      },
      {
        //      label: 'Contraseña',
        field: 'pass',
        width: 20,
      },
      {
        //      label: 'Eliminar',
        field: 'delete',
        width: 20,
      },
      {
        //      label: 'Eliminar',
        field: 'product',
        width: 20,
      }
    ],
    rows: [
      ...users.map((data, order) => (
        {
          id: (
            <MDBBadge pill color='primary' className='p-1 px-2' key={order} searchvalue={order}>
              ID: {data.id}
            </MDBBadge>
          ),
          name: data.name,
          email: data.email,
          role: data.role,
          edit: <EditUser id={data.id} name={data.name} email={data.email} role={data.role} path={data.path}/>,
          pass: <PassUser id={data.id} />,
          delete: <DeleteUser id={data.id} />,
          product: <ProductUser path={data.path} />
        }
      ))
    ]
  };


return (
    <div>
      <Button variant="primary" onClick={handleShow}>
       <MDBIcon far icon="edit" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <MDBDataTableV5
          className='cust-table'
          responsive
          bordered
          hover
          btn
          data={data}
        />
    
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

export default ProductUser;