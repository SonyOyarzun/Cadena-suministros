import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';

class ApiConfig extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: []
    }

    this.getData = this.getData.bind(this)
  }

  componentDidMount() {

    this.getData()
  
  }



  render() {

    const getData = () => {
      axios({
        method: 'get',
        url: 'json-api/config'
      })
        .then((response) => {
          console.log(response.data);
          this.setState({ config: response.data[0] })
        }, (error) => {
          console.log(error);
        });
  
    }
    const process = () => {

      axios({
        method: 'put',
        url: 'json-api/editConfig',
        data: {
          path:         document.getElementById('path').value,
          transaction:  document.getElementById('transaction').value,
          asset:        document.getElementById('asset').value,
          api_port:     document.getElementById('api_port').value,
          db_port:      document.getElementById('db_port').value,
          logotype:     document.getElementById('logotype').value,
          background:   document.getElementById('background').value
        }
      })
        .then((response) => {
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
        <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5"><strong>Configuracion</strong></h3>
              </div>
              <MDBInput id='path' label="Ruta de API" value={this.state.config.path} validate error="wrong" success="right" />
              <MDBInput id='transaction' label="Ruta de Transacciones" value={this.state.config.transaction} validate error="wrong" success="right" />
              <MDBInput id='asset' label="Ruta de Assets" value={this.state.config.asset} validate error="wrong" success="right" />
              <MDBInput id='api_port' label="Puertos Api" value={this.state.config.api_port} validate error="wrong" success="right" />
              <MDBInput id='db_port' label="Puertos db" value={this.state.config.db_port} validate error="wrong" success="right" />
              <MDBInput id='logotype' label="Ruta de logo" value={this.state.config.logotype} validate error="wrong" success="right" />
              <MDBInput id='background' label="Ruta de fondo" value={this.state.config.background} validate error="wrong" success="right" />
              <div className="text-center pt-3 mb-3">
                <MDBBtn type="button" gradient="blue" rounded className="btn-block z-depth-1a" onClick={process}>Actualizar</MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default ApiConfig;