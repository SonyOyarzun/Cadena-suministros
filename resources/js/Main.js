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
import Profile from './access/Profile'

const styles = {
  padding: {
    paddingTop: "20vh",
    paddingBottom: "3vh",
    paddingRight: "10vw",
    paddingLeft: "15vw"
  }
}


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: [],
      config: []
    }
  }



  componentDidMount() {

    axios.all([
      axios.get('/user/my/'),
      axios.get('/json-api/config'),
    ])
      .then(responseArr => {

        this.setState({ user: responseArr[0].data })
        this.setState({ config: responseArr[1].data[0] })
        this.setState({ loading: false })

      })


  }

  render() {

    const { loading } = this.state;

    //console.log('eval navbar',(this.state.user.role == 'A' || this.state.user.role == 'U'),'value',this.state.user.role)

    if (document.getElementById("app")) {
      const assetPath = document.getElementById("app").getAttribute("assetPath");
      ReactDOM.render(<Routes assetPath={assetPath} />,
        document.getElementById("app"));
    }

    if (loading) { // if your component doesn't have to wait for an async action, remove this block 
      return <Load />; // render null when app is not ready
    } else {

      return (
        <BrowserRouter>
          <div>
            <Head />

            {(this.state.user.role == 'A' || this.state.user.role == 'U') ?
              (
              <>
              <SideNavBar value={this.state.user.role} config={this.state.config} />
              <Profile user={this.state.user} config={this.state.config} /> 
              </>
              )
              :
              (<NavBar value={this.state.user.role} config={this.state.config} />)
            }
            <MDBContainer fluid style={styles.padding}>

              <Routes />

            </MDBContainer>

            <Foot config={this.state.config} />
          </div>
        </BrowserRouter>
      )
    }
  }
}

//export default App
render(<App />, document.getElementById('root'));