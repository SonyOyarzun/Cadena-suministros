import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';

class ApiConfig extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: []
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {

    this.getData()

  }


  getData = () => {
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

  render() {


    const process = () => {

      axios({
        method: 'put',
        url: 'json-api/editConfig',
        data: {
          id: document.getElementById('id').value,
          path: document.getElementById('path').value,
          transaction: document.getElementById('transaction').value,
          asset: document.getElementById('asset').value,
          api_port: document.getElementById('api_port').value,
          db_port: document.getElementById('db_port').value,
          logotype: document.getElementById('logotype').value,
          background: document.getElementById('background').value
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

              <div className="input-group">
                <div className="input-group-prepend">
                </div>
                <input id='id' type="hidden" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" defaultValue={this.state.config.id} />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    Ruta Api
                  </span>
                </div>
                <input id='path' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" defaultValue={this.state.config.path} />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    Ruta Transacciones
                  </span>
                </div>
                <input id='transaction' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" defaultValue={this.state.config.transaction} />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    Ruta Assets
                  </span>
                </div>
                <input id='asset' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" defaultValue={this.state.config.asset} />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    Puerto de Api
                  </span>
                </div>
                <input id='api_port' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" defaultValue={this.state.config.api_port} />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    Puerto de DB
                  </span>
                </div>
                <input id='db_port' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" defaultValue={this.state.config.db_port} />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    Ruta de Logotipo
                  </span>
                </div>
                <input id='logotype' type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" defaultValue={this.state.config.logotype} />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    Ruta de Fondo
                  </span>
                </div>
                <input id='background' type="text" className="form-control" placeholder="background" aria-label="Fondo" aria-describedby="basic-addon" defaultValue={this.state.config.background} />
              </div>
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