import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Dependencias necesarias para single page
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

//se deben importar todos los comonentes en el modulo que corresponde
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import props from 'prop-types';




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
          <Navbar.Brand as={Link} to='#home'>Cadena de Suministros</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.handleLink("home")}>Inicio</Nav.Link>
              <Nav.Link onClick={() => this.handleLink("Traza")}>Traza</Nav.Link>
              <NavDropdown title="Administración" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => this.handleLink("User")}>Usuarios</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.handleLink("ApiConfig")}>Configuracion</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Distribución" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => this.handleLink("MyProduct")}>Mis Productos</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.handleLink("Pedido")}>Pedidos</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.handleLink("Envio")}>Envio</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.handleLink("Recepcion")}>Recepcion</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => this.handleLink("Notificaciones")}>Notificaciones</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='logout'>Salir</Nav.Link>
            </Nav>

            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

      </div>

    )
  }
};

NavBar = withRouter(NavBar);
export default NavBar;
