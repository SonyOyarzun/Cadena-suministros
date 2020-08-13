
import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import { asyncComponent } from 'react-async-component';
import {Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

//importacion de react
import 'bootstrap/dist/css/bootstrap.min.css';


//importacion a html
import Head from './import/Head'
import Foot from './import/Foot'

import NavBar from './components/NavBar'
import Producto from './components/Producto'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
              <Head/>
              <NavBar/>

              <div className="container">

             


              </div>
             <Foot/>
            </div>
          </BrowserRouter>
        )
    }
}

render(<App/>, document.getElementById('app'));
