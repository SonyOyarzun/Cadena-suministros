
import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import { asyncComponent } from 'react-async-component';
import { BrowserRouter } from 'react-router-dom'

//importacion de react
import { Container } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

//import Material Bootstrap
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

import { MDBIcon, MDBDataTableV5, MDBBadge, MDBBtn, MDBContainer } from "mdbreact";


//importacion a html
import Head from './import/Head'
import Foot from './import/Foot'

import NavBar from './components/NavBar'
import Routes from './components/Routes'

import Load from './components/extra/Load'

  const styles = {
    padding: {
        paddingTop: "10vh",
        paddingBottom: "10vh",
        paddingRight: "5vw",
        paddingLeft: "5vw"
    }
}


class App extends Component {

   
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    }

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ loading: false }));
   
  }
  
    render() {

      const { loading } = this.state;
    
      if(loading) { // if your component doesn't have to wait for an async action, remove this block 
        return <Load/>; // render null when app is not ready
      }else{

        return (
            <BrowserRouter>
            <div>
              <Head/>
              <NavBar/>

              <MDBContainer fluid style={styles.padding}>

              <Routes/>

              </MDBContainer>
              
             <Foot/>
            </div>
          </BrowserRouter>
        )
    }
  }
}



function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

render(<App/>, document.getElementById('root'));
