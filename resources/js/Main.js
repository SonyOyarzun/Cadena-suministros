
import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import { asyncComponent } from 'react-async-component';
import { BrowserRouter } from 'react-router-dom'

//importacion de react
import { Container } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Material Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import CircularProgress from '@material-ui/core/CircularProgress';


//importacion a html
import Head from './import/Head'
import Foot from './import/Foot'

import NavBar from './components/NavBar'
import Routes from './components/Routes'

  const styles = {
    padding: {
        paddingTop: "10vh",
        paddingBottom: "10vh",
        paddingRight: "10vw",
        paddingLeft: "10vw"
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
        return <CircularProgress/>; // render null when app is not ready
      }else{

        return (
            <BrowserRouter>
            <div>
              <Head/>
              <NavBar/>

              <Container fluid style={styles.padding}>

              <Routes/>

              </Container>
              
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
