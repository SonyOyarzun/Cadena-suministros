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

import Login from '../access/Login'

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
          <Navbar.Brand className='darkLight' as={Link} to='/'><img src={'/storage/images/'+this.props.config.logotype} width='150vw' height='70vw'></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">

            <Nav.Link className='text-center darkLight'><Link className='darkLight-text' to='/Trace'><MDBIcon icon="barcode" />Traza</Link></Nav.Link>
            <Nav.Link className='text-center darkLight'><Link className='darkLight-text' to='/Search'><MDBIcon icon="search" />Buscar TX</Link></Nav.Link>

            </Nav>


            <Nav>
              
            <Login/>

            </Nav>
            
            
          </Navbar.Collapse>
        </Navbar>

      </div>

    )
  }
};

NavBar = withRouter(NavBar);
export default NavBar;


/**
 * 
            <Nav.Link><Link className='darkLight-text' to='/'><MDBIcon icon="" />Quienes Somos?</Link></Nav.Link>
            <Nav.Link><Link className='darkLight-text' to='/'><MDBIcon icon="" />Como Funciona?</Link></Nav.Link>
 */