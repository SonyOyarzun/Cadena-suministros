import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import { Button, Modal, Card, Form, ListGroup } from 'react-bootstrap';
import Upload from '../extra/UploadFile'
import { getConfig, editConfig } from "../tables/TableFunctions";

import Carousel from 'react-bootstrap/Carousel';

class ApiConfig extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      id: 1,

      //api
      path: '',
      transaction: '',
      asset: '',
      api_port: '',
      db_port: '',

      //correo
      mailer: '',
      host: '',
      port: '',
      user: '',
      pass: '',
      encryption: '',  	
			from: '',
      fromName: '',


      //firebase
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
      
    }
    this.getData = this.getData.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    console.log('onchange event', e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex })
  };

  componentDidMount() {

    this.getData()

  }


  getData = () => {
    getConfig().then((response) => {
      console.log('apiconfig', response);
      this.setState({  //api
        path: response.path,
        transaction: response.transaction,
        asset: response.asset,
        api_port: response.api_port,
        db_port: response.db_port,
  
        //correo
        mailer: response.mailer,
        host: response.host,
        port: response.port,
        user: response.user,
        pass: response.pass,
        encryption: response.encryption,  	
        from: response.from,
        fromName: response.fromName,
  
  
        //firebase
        apiKey: response.apiKey,
        authDomain: response.authDomain,
        databaseURL: response.databaseURL,
        projectId: response.projectId,
        storageBucket: response.storageBucket,
        messagingSenderId: response.messagingSenderId,
        appId: response.appId,
        measurementId: response.measurementId,
        serverKey: response.serverKey,

       })
    }, (error) => {
      console.log(error);
    });

  }

  render() {


    const process = () => {

      editConfig(this.state).then((response) => {
        console.log(response);
        this.getData()
        alert(response)
      }, (error) => {
        console.log(error);
      });

    }

    const smallStyle = { fontSize: '0.8rem' }

    return (
      <MDBRow>
        <MDBCol md="10" lg="10" xl="10" className="mx-auto mt-5">
          <Form>
            <Carousel activeIndex={this.state.index} onSelect={this.handleSelect} style={{ padding: '9vw' }}>

              <Carousel.Item>
                <Card>
                  <Card.Header>APP</Card.Header>
                  <Card.Body>
                    <Form.Group controlId="configForm.logotype">
                      <Upload type='logotype' />
                    </Form.Group>
                    <Form.Group controlId="configForm.background">
                      <Upload type='background' />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <Card.Header>API</Card.Header>
                  <Card.Body>

                    <Form.Group controlId="configForm.apiPath">
                      <Form.Label>Ruta API</Form.Label>
                      <Form.Control name='path' type="text" placeholder="Ruta API" maxLength="30" defaultValue={this.state.path} onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group controlId="configForm.txPath">
                      <Form.Label>Ruta Transaccion</Form.Label>
                      <Form.Control name='txPath' type="text" placeholder="Ruta Transaccion" maxLength="30" defaultValue={this.state.transaction} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.assetPath">
                      <Form.Label>Ruta Asset</Form.Label>
                      <Form.Control name='assetPath' type="text" placeholder="Ruta Asset" maxLength="30" defaultValue={this.state.asset} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.apiPort">
                      <Form.Label>Puerto API</Form.Label>
                      <Form.Control name='apiPort' type="text" placeholder="Puerto API" maxLength="300" defaultValue={this.state.api_port} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.dbPort">
                      <Form.Label>Puerto DB</Form.Label>
                      <Form.Control name='dbPort' type="text" placeholder="Puerto DB" maxLength="300" defaultValue={this.state.db_port} onChange={this.onChange}/>
                    </Form.Group>

                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <Card.Header>Servidor de Correo</Card.Header>
                  <Card.Body>
                    <Form.Group controlId="configForm.mailer">
                      <Form.Label>Mailer</Form.Label>
                      <Form.Control name='mailer' type="text" placeholder="Mailer" maxLength="30" defaultValue={this.state.mailer} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.host">
                      <Form.Label>Host</Form.Label>
                      <Form.Control name='host' type="text" placeholder="Host" maxLength="30" defaultValue={this.state.host} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.port">
                      <Form.Label>Puerto</Form.Label>
                      <Form.Control name='port' type="text" placeholder="Puerto" maxLength="30" defaultValue={this.state.port} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.user">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control name='user' type="text" placeholder="Usuario" maxLength="300" defaultValue={this.state.user} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.pass">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control name='pass' type="text" placeholder="Contraseña" maxLength="300" defaultValue={this.state.pass} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.encryption">
                      <Form.Label>Encriptacion</Form.Label>
                      <Form.Control name='encryption' type="text" placeholder="Encriptacion" maxLength="300" defaultValue={this.state.encryption} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.from">
                      <Form.Label>Remitente</Form.Label>
                      <Form.Control name='from' type="text" placeholder="Remitente" maxLength="300" defaultValue={this.state.from} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.fromName">
                      <Form.Label>Nombre Remitente</Form.Label>
                      <Form.Control name='fromName' type="text" placeholder="Nombre Remitente" maxLength="300" defaultValue={this.state.fromName} onChange={this.onChange}/>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <Card.Header>FireBase</Card.Header>
                  <Card.Body>
                    <Form.Group controlId="configForm.apiKey">
                      <Form.Label>API key</Form.Label>
                      <Form.Control name='apiKey' type="text" placeholder="Ruta API" maxLength="30" defaultValue={this.state.apiKey} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.authDomain">
                      <Form.Label>Auth Domain</Form.Label>
                      <Form.Control name='authDomain' type="text" placeholder="Ruta Transaccion" maxLength="30" defaultValue={this.state.authDomain} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.databaseURL">
                      <Form.Label>Database URL</Form.Label>
                      <Form.Control name='databaseURL' type="text" placeholder="Ruta Asset" maxLength="30" defaultValue={this.state.databaseURL} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.projectId">
                      <Form.Label>Project ID</Form.Label>
                      <Form.Control name='projectId' type="text" placeholder="Puerto API" maxLength="300" defaultValue={this.state.projectId} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.storageBucket">
                      <Form.Label>Storage Bucket</Form.Label>
                      <Form.Control name='storageBucket' type="text" placeholder="Puerto DB" maxLength="300" defaultValue={this.state.storageBucket} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.messagingSenderId">
                      <Form.Label>Messaging Sender ID</Form.Label>
                      <Form.Control name='messagingSenderId' type="text" placeholder="Puerto DB" maxLength="300" defaultValue={this.state.messagingSenderId} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.appId">
                      <Form.Label>App ID</Form.Label>
                      <Form.Control name='appId' type="text" placeholder="Puerto DB" maxLength="300" defaultValue={this.state.appId} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.measurementId">
                      <Form.Label>Measurement ID</Form.Label>
                      <Form.Control name='measurementId' type="text" placeholder="Puerto DB" maxLength="300" defaultValue={this.state.measurementId} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="configForm.measurementId">
                      <Form.Label>Server Key</Form.Label>
                      <Form.Control name='serverKey' type="text" placeholder="Llave de servidor" maxLength="300" defaultValue={this.state.serverKey} onChange={this.onChange}/>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Carousel.Item>

            </Carousel>

           
              <MDBBtn type="button" gradient="blue" rounded className="btn-block mx-auto col-5 z-depth-1a" onClick={process}>Actualizar</MDBBtn>
            

          </Form>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default ApiConfig;

