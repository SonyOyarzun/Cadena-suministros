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
      config: []
    }
    this.getData = this.getData.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }



  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex })
  };

  componentDidMount() {

    this.getData()

  }


  getData = () => {
    getConfig().then((response) => {
      console.log(response);
      this.setState({ config: response })
    }, (error) => {
      console.log(error);
    });

  }

  render() {


    const process = () => {

      const data = {
        id: document.getElementById('id').value,
        path: document.getElementById('path').value,
        transaction: document.getElementById('transaction').value,
        asset: document.getElementById('asset').value,
        api_port: document.getElementById('api_port').value,
        db_port: document.getElementById('db_port').value,
        //  logotype: document.getElementById('logotype').value,
        //  background: document.getElementById('background').value
      }

      editConfig(data).then((response) => {
        console.log(response);
        this.getData()
        alert(response.data)
      }, (error) => {
        console.log(error);
      });

    }

    const smallStyle = { fontSize: '0.8rem' }

    return (
      <MDBRow>
        <MDBCol md="9" lg="9" xl="9" className="mx-auto mt-5">
          <Form>
            <Carousel activeIndex={this.state.index} onSelect={this.handleSelect} style={{ padding: '80px'}}>

              <Carousel.Item>
                <Card>
                  <Card.Header>API</Card.Header>
                  <Card.Body>
              
                    <Form.Group controlId="configForm.apiPath">
                      <Form.Label>Ruta API</Form.Label>
                      <Form.Control name='apiPath' type="text" placeholder="Ruta API" maxLength="30" defaultValue={this.state.config.path} />
                    </Form.Group>
                    <Form.Group controlId="configForm.txPath">
                      <Form.Label>Ruta Transaccion</Form.Label>
                      <Form.Control name='txPath' type="text" placeholder="Ruta Transaccion" maxLength="30" defaultValue={this.state.config.transaction} />
                    </Form.Group>
                    <Form.Group controlId="configForm.assetPath">
                      <Form.Label>Ruta Asset</Form.Label>
                      <Form.Control name='assetPath' type="text" placeholder="Ruta Asset" maxLength="30" defaultValue={this.state.config.asset} />
                    </Form.Group>
                    <Form.Group controlId="configForm.apiPort">
                      <Form.Label>Puerto API</Form.Label>
                      <Form.Control name='apiPort' type="text" placeholder="Puerto API" maxLength="300" defaultValue={this.state.config.api_port} />
                    </Form.Group>
                    <Form.Group controlId="configForm.dbPort">
                      <Form.Label>Puerto DB</Form.Label>
                      <Form.Control name='dbPort' type="text" placeholder="Puerto DB" maxLength="300" defaultValue={this.state.config.db_port} />
                    </Form.Group>

                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <Card.Header>Servidor de Correo</Card.Header>
                  <Card.Body>
                  <Form.Group controlId="configForm.apiPath">
                      <Form.Label>Ruta API</Form.Label>
                      <Form.Control name='apiPath' type="text" placeholder="Ruta API" maxLength="30" defaultValue={this.state.config.path} />
                    </Form.Group>
                    <Form.Group controlId="configForm.txPath">
                      <Form.Label>Ruta Transaccion</Form.Label>
                      <Form.Control name='txPath' type="text" placeholder="Ruta Transaccion" maxLength="30" defaultValue={this.state.config.transaction} />
                    </Form.Group>
                    <Form.Group controlId="configForm.assetPath">
                      <Form.Label>Ruta Asset</Form.Label>
                      <Form.Control name='assetPath' type="text" placeholder="Ruta Asset" maxLength="30" defaultValue={this.state.config.asset} />
                    </Form.Group>
                    <Form.Group controlId="configForm.apiPort">
                      <Form.Label>Puerto API</Form.Label>
                      <Form.Control name='apiPort' type="text" placeholder="Puerto API" maxLength="300" defaultValue={this.state.config.api_port} />
                    </Form.Group>
                    <Form.Group controlId="configForm.dbPort">
                      <Form.Label>Puerto DB</Form.Label>
                      <Form.Control name='dbPort' type="text" placeholder="Puerto DB" maxLength="300" defaultValue={this.state.config.db_port} />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <Card.Header>FireBase</Card.Header>
                  <Card.Body>
                  <Form.Group controlId="configForm.apiPath">
                      <Form.Label>Ruta API</Form.Label>
                      <Form.Control name='apiPath' type="text" placeholder="Ruta API" maxLength="30" defaultValue={this.state.config.path} />
                    </Form.Group>
                    <Form.Group controlId="configForm.txPath">
                      <Form.Label>Ruta Transaccion</Form.Label>
                      <Form.Control name='txPath' type="text" placeholder="Ruta Transaccion" maxLength="30" defaultValue={this.state.config.transaction} />
                    </Form.Group>
                    <Form.Group controlId="configForm.assetPath">
                      <Form.Label>Ruta Asset</Form.Label>
                      <Form.Control name='assetPath' type="text" placeholder="Ruta Asset" maxLength="30" defaultValue={this.state.config.asset} />
                    </Form.Group>
                    <Form.Group controlId="configForm.apiPort">
                      <Form.Label>Puerto API</Form.Label>
                      <Form.Control name='apiPort' type="text" placeholder="Puerto API" maxLength="300" defaultValue={this.state.config.api_port} />
                    </Form.Group>
                    <Form.Group controlId="configForm.dbPort">
                      <Form.Label>Puerto DB</Form.Label>
                      <Form.Control name='dbPort' type="text" placeholder="Puerto DB" maxLength="300" defaultValue={this.state.config.db_port} />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Carousel.Item>

            </Carousel>

            <div className="text-center pt-3 mb-3">
              <MDBBtn type="button" gradient="blue" rounded className="btn-block z-depth-1a" onClick={process}>Actualizar</MDBBtn>
            </div>

          </Form>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default ApiConfig;

/**

<Form>

                <Card style={{ width: '100%' }}>
                  <Card.Header>API</Card.Header>
                  <Card.Body>
                  <Form.Group controlId="configForm.apiPath">
                  </Form.Group>
                  <Form.Group controlId="editUserForm.name">
                    <Form.Label>Ruta API</Form.Label>
                    <Form.Control name='name' type="text" placeholder="nombre completo" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="configForm.txPath">
                    <Form.Label>Ruta Transaccion</Form.Label>
                    <Form.Control name='email' type="email" placeholder="name@example.com" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.role">
                    <Form.Label>Ruta Asset</Form.Label>
                    <Form.Control name='email' type="email" placeholder="name@example.com" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.path">
                    <Form.Label>Puerto API</Form.Label>
                    <Form.Control name='path' rows="3" maxLength="300" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.path">
                    <Form.Label>Puerto DB</Form.Label>
                    <Form.Control name='path' rows="3" maxLength="300" />
                  </Form.Group>
                  </Card.Body>
                </Card>

                <Card style={{ width: '100%' }}>
                  <Card.Header>Servidor de Correo</Card.Header>
                  <Card.Body>
                  <Form.Group controlId="configForm.apiPath">
                  </Form.Group>
                  <Form.Group controlId="editUserForm.name">
                    <Form.Label>Ruta API</Form.Label>
                    <Form.Control name='name' type="text" placeholder="nombre completo" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="configForm.txPath">
                    <Form.Label>Ruta Transaccion</Form.Label>
                    <Form.Control name='email' type="email" placeholder="name@example.com" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.role">
                    <Form.Label>Ruta Asset</Form.Label>
                    <Form.Control name='email' type="email" placeholder="name@example.com" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.path">
                    <Form.Label>Puerto API</Form.Label>
                    <Form.Control name='path' rows="3" maxLength="300" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.path">
                    <Form.Label>Puerto DB</Form.Label>
                    <Form.Control name='path' rows="3" maxLength="300" />
                  </Form.Group>
                  </Card.Body>
                </Card>

                <Card style={{ width: '100%' }}>
                  <Card.Header>Firebase</Card.Header>
                  <Card.Body>
                  <Form.Group controlId="configForm.apiPath">
                  </Form.Group>
                  <Form.Group controlId="editUserForm.name">
                    <Form.Label>Ruta API</Form.Label>
                    <Form.Control name='name' type="text" placeholder="nombre completo" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="configForm.txPath">
                    <Form.Label>Ruta Transaccion</Form.Label>
                    <Form.Control name='email' type="email" placeholder="name@example.com" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.role">
                    <Form.Label>Ruta Asset</Form.Label>
                    <Form.Control name='email' type="email" placeholder="name@example.com" maxLength="30" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.path">
                    <Form.Label>Puerto API</Form.Label>
                    <Form.Control name='path' rows="3" maxLength="300" />
                  </Form.Group>
                  <Form.Group controlId="editUserForm.path">
                    <Form.Label>Puerto DB</Form.Label>
                    <Form.Control name='path' rows="3" maxLength="300" />
                  </Form.Group>
                  </Card.Body>
                </Card>




              </Form>

 */