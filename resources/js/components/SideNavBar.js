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
        <SideNav
          onSelect={(selected) => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav>


            {this.props.value == 'A' &&

              <NavItem eventKey="administracion">

                <NavIcon>
                  <MDBIcon icon="tools" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  Administración
              </NavText>
                <NavItem eventKey="administracion/usuarios">
                  <NavText>
                    <Link to='/User'>Usuarios</Link>
                  </NavText>
                </NavItem>

                <NavItem eventKey="administracion/configuracion">
                  <NavText>
                    <Link to='/ApiConfig'>Configuración</Link>
                  </NavText>
                </NavItem>

              </NavItem>

            }

            {(this.props.value == 'A' || this.props.value == 'U') &&

              <NavItem eventKey="distribucion">
                <NavIcon>
                  <MDBIcon icon="truck-moving" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  Distribución
              </NavText>
                <NavItem eventKey="distribucion/usuarios">
                  <NavText>
                    <Link to='/MyProduct'>Mis Productos</Link>
                  </NavText>
                </NavItem>

                <NavItem eventKey="distribucion/reenviar">
                  <NavText>
                    <Link to='/MyReception'>Reenviar Productos</Link>
                  </NavText>
                </NavItem>

                <NavItem eventKey="distribucion/pedidos">
                  <NavText>
                    <Link to='/Order'>Pedidos</Link>
                  </NavText>
                </NavItem>

                <NavItem eventKey="distribucion/recibir">
                  <NavText>
                    <Link to='/Receive'>Recibir Producto</Link>
                  </NavText>
                </NavItem>

                <NavItem eventKey="distribucion/temperatura">
                  <NavText>
                    <Link to={'/Temperature/' + this.props.user.id}>Temperatura</Link>
                  </NavText>
                </NavItem>

              </NavItem>
            }

            <NavItem eventKey="buscar">
              <NavIcon>
                <MDBIcon icon="search" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Buscar
              </NavText>

              <NavItem eventKey="buscar/transaccion">
                <NavText>
                  <Link to='/Search'>Buscar TX</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="buscar/traza">
                <NavText>
                  <Link to='/Trace'>Traza</Link>
                </NavText>
              </NavItem>


            </NavItem>


          </SideNav.Nav>
        </SideNav>

      </div >

    )
  }
};

export default withRouter(SideNavBar);

