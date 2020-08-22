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
  const [products, setProducts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });

  const params = {
    "path": props.path,
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  }

  //json-api
  useEffect(() => {
    axios.get('/user/list/',{
      params,
      headers
    }).then(response => {
      setProducts(response.data);
      console.log(response.data)
    }).catch(error => {
      alert("Error " + error)
    })
  }, []);

  console.log("usuarios.data :", products)


let columns = []
let rows    = []

Object.keys(products).map((key, row) => (
  console.log('row:',row),


  Object.keys(products[key]).map((key2, col) => (
    console.log('row:',row,' col:',col,),
 // columns = {...columns, label:key2},
    rows[key2]=products[key][key2]
    ))
  
))


  let data = { 
    columns,
    rows
  };

  console.log(data)

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