
import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import { asyncComponent } from 'react-async-component';
import {Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

//importacion de react
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//importacion a html
import Head from './import/Head'
import Foot from './import/Foot'

import NavBar from './components/NavBar'
import Usuario from './components/Usuario'
import Departamento from './components/Departamento'

  const styles = {
    padding: {
        paddingTop: "10vh",
        paddingBottom: "10vh",
        paddingRight: "10vw",
        paddingLeft: "10vw"
    }
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
              <Head/>
              <NavBar/>

              <Container fluid >

              <Route path="/Usuario" component={Usuario} />
              <Route path="/Departamento" component={Departamento} />

              </Container>
              
             <Foot/>
            </div>
          </BrowserRouter>
        )
    }
}

render(<App/>, document.getElementById('app'));
