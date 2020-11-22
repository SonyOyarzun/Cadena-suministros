import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'
import Theme from '../components/extra/Theme'
import Font from '../components/extra/Font'

import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";


var style = {
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "100",
    width: "100%",
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '10px',
    width: '100%',
}
const styles = {
    fieldSet: {
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#000'
    },
    legend: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF'
    }
};

function Footer(props) {
    return (
        <div>
            <div style={phantom} />
            <div style={style} className='foot'>

                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                        <MDBCol md="6">
                            <h5 className="title"><img src={'/img/logo.svg'} width={'90'} height={'70'} /></h5>
                            <p>
                                Proyecto de Titulo: Cadena de suministros.
                                </p>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBRow>

                                <legend><Theme config={props.config} /></legend>
                                <legend><Font config={props.config} /></legend>

                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Cadena de Suministros CASU
                        </MDBContainer>
                </div>
            </div>
        </div>
    )
}



export default Footer
