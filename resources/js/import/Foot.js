import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'
import Theme from '../components/extra/Theme'
import Font from '../components/extra/Font'

import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardHeader } from "mdbreact";


let style = {
    padding: "0px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "160px",
    width: "100%",
    zIndex: 9999
}

let phantom = {
    display: 'block',
    padding: '20px',
    height: '10px',
    width: '100%',
}

let theme = {
    position: 'relative',
    bottom: '-20px',
    padding: '0',
    height: '10px',
    paddingRight: 20,
}

let text = {
    marginLeft: 20,
}

let logo = {
    bottom: '-15px',
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

                <MDBContainer fluid className="text-center">
                    <MDBRow>
                        <MDBCol className='col-sm-10 text-left' style={logo}>
                            <div><img src={'/img/logo.svg'} width={'100'} height={'80'} /></div>
                            <p>
                                Proyecto de Titulo: Cadena de suministros.
                            </p>
                        </MDBCol>

                        <MDBCol className='col-sm-2' style={theme} >
                            <MDBCard>
                                <table>
                                    <tr>
                                        <td><label style={text}>Contraste</label></td>
                                        <td><Theme style={theme} config={props.config} /></td>
                                    </tr>
                                    <tr>
                                        <td><label style={text}>Fuente</label></td>
                                        <td><Font style={theme} config={props.config} /></td>
                                    </tr>
                                </table>
                            </MDBCard>
                        </MDBCol>

                    </MDBRow>

                    <div className="footer-copyright col-sm-12" height={'100'}>
                        <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Cadena de Suministros CASU
                    </MDBContainer>
                    </div>

                </MDBContainer>
            </div >
        </div >
    )
}



export default Footer
