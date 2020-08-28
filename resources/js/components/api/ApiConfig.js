import React,{Component} from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';

class ApiConfig extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: []
    }
  }

  componentDidMount(){

    axios({
      method: 'get',
      url: 'json-api/config'
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ config: response.data })
      }, (error) => {
        console.log(error);
      });

  }


  render() {

    const smallStyle = { fontSize: '0.8rem'}

    return (
        <MDBRow>
          <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5"><strong>Configuracion</strong></h3>
                </div>
                <MDBInput label="Ruta de API"           value={this.state.config} validate error="wrong" success="right"/>
                <MDBInput label="Ruta de Transacciones" value={this.state.config} validate error="wrong" success="right"/>
                <MDBInput label="Puertos"               value={this.state.config} validate error="wrong" success="right"/>
                <MDBInput label="Ruta de logo"          value={this.state.config} validate error="wrong" success="right"/>
                <MDBInput label="Ruta de fondo"         value={this.state.config} validate error="wrong" success="right"/>
                <div className="text-center pt-3 mb-3">
                  <MDBBtn type="button" gradient="blue" rounded className="btn-block z-depth-1a">Actualizar</MDBBtn>
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