import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'
import Theme from '../components/extra/Theme'
import Font from '../components/extra/Font'

import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardHeader } from "mdbreact";


let style = {
    paddingTop: "5px",
    margin: "0px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "90px",
    width: "100%",
    zIndex: 1500
}

let phantom = {
    display: 'block',
    padding: '20px',
    heigth: '10px',
    width: '100%',
}

let theme = {
    bottom: '-5px',
    padding: '0',
    height: '10px',
}

let text = {
    marginLeft: 10,
}

let line = {
    position: 'fixed',
    bottom: '10px',
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

                <MDBContainer fluid >
                    <MDBRow>
                        <MDBCol className='col-8'>
                            <img src={'/img/logo.svg'} style={{width:'5em'}}></img>
                        </MDBCol>
                        <MDBCol className='col-4' style={theme} >
                            <MDBCard>
                                <table>
                                    <tr>
                                        <td><label style={text}>Contraste</label></td>
                                        <td><Theme style={theme} config={props.config} /></td>
                                        <td><label style={text}>Fuente</label></td>
                                        <td><Font style={theme} config={props.config} /></td>
                                    </tr>
                                </table>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol className="footer-copyright col-sm-12 text-center" style={line} height={'100'}>
                            <MDBContainer fluid>
                                &copy; {new Date().getFullYear()} Cadena de Suministros CASU
                    </MDBContainer>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div >
        </div >
    )
}



export default Footer
