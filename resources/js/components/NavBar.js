import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import {NavLink, withRouter}  from 'react-router-dom';


class NavBar extends React.Component {

    render() {
        return (

<div>

<nav className="navbar navbar-default ">
  <div className="container-fluid">
    <div className="navbar-header">

      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>

      </button>
      <a className="navbar-brand" href="#">Owl Evaluation</a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">

        <li><NavLink to="/Encuesta"><i className='glyphicon glyphicon-copy'></i> Encuestas</NavLink></li>
        <li><NavLink to="/Departamento"><i className='glyphicon glyphicon-home'></i> Departamentos</NavLink></li>
		    <li><NavLink to="/Usuario"><i  className='glyphicon glyphicon-user'></i> Usuarios</NavLink></li>

       </ul>

      <ul className="nav navbar-nav navbar-right">

           <li><a className="navbar-brand" ><i></i></a></li>
           <li><NavLink to="/Historial"><i className='glyphicon glyphicon-tasks'></i> Historial</NavLink></li>
           <li><NavLink to="/Notificaciones"><i className='glyphicon glyphicon-warning-sign'></i> Notificaciones</NavLink></li>
	         <li><NavLink to="/Salir"><i className='glyphicon glyphicon-off'></i> Salir</NavLink></li>
      </ul>
    </div>
  </div>
</nav>


</div>

        )
    }
};

NavBar = withRouter(NavBar);
export default NavBar;
