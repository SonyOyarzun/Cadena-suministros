import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Dependencias necesarias para single page
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

//se deben importar todos los comonentes en el modulo que corresponde
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import props from 'prop-types';

import { MDBIcon, MDBBtn } from "mdbreact";

import Theme from '../components/extra/Theme'

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  handleLink(path) {
    this.props.history.push(path);
  }

  render() {
console.log('value :',this.props.value)

    return (

      <div>

        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to='#home'>Cadena de Suministros</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

              {
                (() => {
                  switch (this.props.value) {
                    case 1:
                      return
                      <NavDropdown title={<><MDBIcon icon="tools" /> Administración</>} id="basic-nav-dropdown-administraciio">
                        <NavDropdown.Item onClick={() => this.handleLink("User")}>Usuarios</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.handleLink("ApiConfig")}>Configuracion</NavDropdown.Item>
                      </NavDropdown>
                      break;
                    case 2:
                      return
                      <NavDropdown title={<><MDBIcon icon="truck-moving" /> Distribución</>} id="basic-nav-dropdown-distribucion">
                        <NavDropdown.Item onClick={() => this.handleLink("MyProduct")}>Mis Productos</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.handleLink("MyReception")}>Reenviar Productos</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.handleLink("Order")}>Pedidos</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.handleLink("Receive")}>Recibir Productos</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.handleLink("Notificaciones")}>Notificaciones</NavDropdown.Item>
                      </NavDropdown>
                      break;
                    default:
                      return
                      <>
                        <Nav.Link onClick={() => this.handleLink("Trace")}><MDBIcon icon="barcode" /> Traza</Nav.Link>
                        <Nav.Link onClick={() => this.handleLink("Search")}><MDBIcon icon="search" /> Buscar TX</Nav.Link>
                      </>
                      break;
                  }
                }).call(this)
              }

            </Nav>
            <Theme />
            <Nav.Link href='logout'><MDBIcon icon="door-open" /> Salir</Nav.Link>
          </Navbar.Collapse>
        </Navbar>

      </div>

    )
  }
};

NavBar = withRouter(NavBar);
export default NavBar;
