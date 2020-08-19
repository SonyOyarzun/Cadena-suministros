import React, { Component, Fragment, useState, useEffect } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
//Material Bootstrap
import { MDBIcon, MDBDataTableV5, MDBBadge, MDBBtn } from "mdbreact";
import { map } from 'jquery';

function ProductUser(props) {

  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get(props.path,{
      headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      }
    }).then(response => {
        setUsers(response.data);
      console.log(response)
    }).catch(error => {
      alert("Error " + error)
    })
  }, []);


  //console.log("usuarios",users)


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
        }
      ))
    ]
  };


  return (
    <div>
      <MDBBtn tag="a" size="sm" gradient="blue" onClick={handleShow}>
        <MDBIcon icon="cart-arrow-down" />
      </MDBBtn>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Productos Disponibles</Modal.Title>
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