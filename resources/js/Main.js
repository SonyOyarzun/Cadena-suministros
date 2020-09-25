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

import SideNavBar from './components/SideNavBar'
import Routes from './components/Routes'

import Load from './components/extra/Load'

const styles = {
  padding: {
    paddingTop: "10vh",
    paddingBottom: "3vh",
    paddingRight: "10vw",
    paddingLeft: "10vw"
  }
}


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: []
    }
  }



  componentDidMount() {
    axios.get('/user/my/').then(response => {
      this.setState({ user: response.data })
      this.setState({ loading: false })
      //   console.log(this.state.users)
    }).catch(error => {
      this.setState({ user: error })
      this.setState({ loading: false })
    })
  }

  render() {

    const { loading } = this.state;

    if (loading) { // if your component doesn't have to wait for an async action, remove this block 
      return <Load />; // render null when app is not ready
    } else {

      return (
        <BrowserRouter>
          <div>
            <Head />

            {
              (() => {
                console.log('value :', this.props.value)
                switch (this.state.user.role) {
                  case 'A':
                    console.log(1)
                    return (
                      <>
                        <SideNavBar value={this.state.user.role} />
                      </>
                    )
                    break;

                    case 'U':
                    console.log(2)
                    return (
                      <>
                        <SideNavBar value={this.state.user.role} />
                      </>
                    )
                    break;

                  default:
                    console.log('default')
                    return (
                      <>
                        <NavBar value={this.state.user.role} />
                      </>
                    )
                    break;
                  }
                }).call(this)
              }
  
                    <MDBContainer fluid style={styles.padding}>

                      <Routes />

                    </MDBContainer>

                      <Foot />
                      </div>
        </BrowserRouter>
      )
    }
  }
}

//export default App
render(<App />, document.getElementById('root'));