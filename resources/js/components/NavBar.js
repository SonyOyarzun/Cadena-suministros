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

    return (

      <div>

        <Navbar bg="light" expand="lg">
          <Navbar.Brand className='darkLight' as={Link} to='#home'>Cadena de Suministros</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

              {
                (() => {
                  console.log('value :', this.props.value)
                  switch (this.props.value) {
                    case 'A':
                      console.log(1)
                      return (
                        <>
                          <NavDropdown title={<><MDBIcon icon="tools" /> Administración</>} id="basic-nav-dropdown-administraciio">
                            <NavDropdown.Item onClick={() => this.handleLink("User")}>Usuarios</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("ApiConfig")}>Configuracion</NavDropdown.Item>
                          </NavDropdown>
                          <NavDropdown title={<><MDBIcon icon="truck-moving" /> Distribución</>} id="basic-nav-dropdown-distribucion">
                            <NavDropdown.Item onClick={() => this.handleLink("MyProduct")}>Mis Productos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("MyReception")}>Reenviar Productos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("Order")}>Pedidos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("Receive")}>Recibir Productos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("Notificaciones")}>Notificaciones</NavDropdown.Item>
                          </NavDropdown>
                          <Nav.Link onClick={() => this.handleLink("Trace")}><MDBIcon icon="barcode" /> Traza</Nav.Link>
                          <Nav.Link onClick={() => this.handleLink("Search")}><MDBIcon icon="search" /> Buscar TX</Nav.Link>
                        </>
                      )
                      break;
                    case 'U':
                      console.log(2)
                      return (
                        <>
                          <NavDropdown title={<><MDBIcon icon="truck-moving" /> Distribución</>} id="basic-nav-dropdown-distribucion">
                            <NavDropdown.Item onClick={() => this.handleLink("MyProduct")}>Mis Productos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("MyReception")}>Reenviar Productos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("Order")}>Pedidos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("Receive")}>Recibir Productos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.handleLink("Notificaciones")}>Notificaciones</NavDropdown.Item>
                          </NavDropdown>
                          <Nav.Link onClick={() => this.handleLink("Trace")}><MDBIcon icon="barcode" /> Traza</Nav.Link>
                          <Nav.Link onClick={() => this.handleLink("Search")}><MDBIcon icon="search" /> Buscar TX</Nav.Link>
                        </>
                      )
                      break;
                    default:
                      console.log('default')
                      return (
                        <>
                          <Nav.Link><Link className='darkLight-text' to='/Trace'><MDBIcon icon="barcode" />Traza</Link></Nav.Link>
                          <Nav.Link><Link className='darkLight-text' to='/Search'><MDBIcon icon="search" />Buscar TX</Link></Nav.Link>
                        </>
                      )
                      break;
                  }
                }).call(this)
              }

            </Nav>
            <Nav.Link><Link className='darkLight-text' to='/'><MDBIcon icon="" />Quienes Somos?</Link></Nav.Link>
            <Nav.Link><Link className='darkLight-text' to='/'><MDBIcon icon="" />Como Funciona?</Link></Nav.Link>
            <div><a className='darkLight-text' href='/logout'><MDBIcon icon="door-open" />Salir</a></div>
          </Navbar.Collapse>
        </Navbar>

      </div>

    )
  }
};

NavBar = withRouter(NavBar);
export default NavBar;
