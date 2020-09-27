import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

//Dependencias necesarias para single page
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

//se deben importar todos los comonentes en el modulo que corresponde
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { MDBIcon, MDBBtn } from "mdbreact";


class SideNavBar extends Component {

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
        <SideNav className='darkLight'
          onSelect={(selected) => {
            // Add your code here
          }}
        >
          <SideNav.Toggle className='darkLight' />
          <SideNav.Nav>

            <NavItem eventKey="home">
              <NavIcon>
                <Link to='/home'><MDBIcon className='darkLight' icon="home" style={{ fontSize: '1.75em' }} /></Link>
              </NavIcon>
              <NavText>
                <Link className='darkLight-text' to='/home'>Home</Link>
              </NavText>
            </NavItem>

{console.log('role',this.props.value)}

{this.props.value=='A' &&

            <NavItem eventKey="administracion">

              <NavIcon>
                <MDBIcon className='darkLight-text' icon="tools" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                <a className='darkLight-text'>Administración</a>
              </NavText>
              <NavItem eventKey="administracion/usuarios">
                <NavText>
                  <Link className='darkLight-text' to='/User'>Usuarios</Link>
                </NavText>
              </NavItem>
              <NavItem eventKey="administracion/configuracion">
                <NavText>
                  <Link className='darkLight-text' to='/ApiConfig'>Configuración</Link>
                </NavText>
              </NavItem>

            </NavItem>

  }

{(this.props.value=='A' || this.props.value=='U') &&

            <NavItem eventKey="distribucion">
              <NavIcon>
                <MDBIcon className='darkLight-text' icon="truck-moving" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                <p className='darkLight-text'>Distribución</p>
              </NavText>
              <NavItem eventKey="distribucion/usuarios">
                <NavText>
                  <Link className='darkLight-text' to='/MyProduct'>Mis Productos</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="distribucion/reenviar">
                <NavText>
                  <Link className='darkLight-text' to='/MyReception'>Reenviar Productos</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="distribucion/pedidos">
                <NavText>
                  <Link className='darkLight-text' to='/Order'>Pedidos</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="distribucion/recibir">
                <NavText>
                  <Link className='darkLight-text' to='/Receive'>Recibir Producto</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="distribucion/notificacion">
                <NavText>
                  <Link className='darkLight-text' to='/Notification'>Notificaciones</Link>
                </NavText>
              </NavItem>

            </NavItem>
  }

            <NavItem eventKey="buscar">
              <NavIcon>
                <MDBIcon className='darkLight-text' icon="search" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                <p className='darkLight-text'>Buscar</p>
              </NavText>

              <NavItem eventKey="buscar/transaccion">
                <NavText>
                  <Link className='darkLight-text' to='/Search'>Buscar TX</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="buscar/traza">
                <NavText>
                  <Link className='darkLight-text' to='/Trace'>Traza</Link>
                </NavText>
              </NavItem>


            </NavItem>
                  



            <NavItem eventKey="salir">
            <NavIcon>
              <a className='darkLight-text' href='/logout'><MDBIcon className='darkLight-text' icon="door-open" style={{ fontSize: '1.75em' }} /></a>
            </NavIcon>
            <NavText>
              <a className='darkLight-text' href='/logout'>Salir</a>
            </NavText>
          </NavItem>



          </SideNav.Nav>
        </SideNav>

      </div >

    )
  }
};

export default withRouter(SideNavBar);

