import React, { Component, Fragment, useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import { Button, Modal, Card, Form, ListGroup } from 'react-bootstrap';


function UploadFile(props) {

    let url = 'upload'
    let type = ''


    switch (props.type) {

        case 'logotype':
            url = 'uploadLogotype'
            type = 'Logotipo'

            break;

        case 'background':
            url = 'uploadBackground'
            type = 'Fondo de pantalla'
            break;

        default:
            break;
    }


    const [file, setFile] = useState('Seleccione Archivo');

    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        setFile(document.getElementById(url).files[0].name)
        console.log(content)


        let formData = new FormData();
        formData.append(url, document.getElementById(url).files[0]);

        axios.post(url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function (data) {

            console.log('success', data);
        }.bind(this)).catch(function (data) {
            console.log('error', data);
        }).finally(()=>{
           if(confirm('Para reflejar cambios en la aplicacion, es necesario refrescar.')){
               window.location.reload()
           }
        })
        // … do something with the 'content' …
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };


    return (
        <>
            <Form.Group controlId="configForm.background">
                <Form>
                    <Form.File
                        className='fileUpload'
                        label= {type}
                        
                        id={url}
                        name={url}
                        onChange={e => handleFileChosen(e.target.files[0])}
                        style={{cursor: 'pointer'}}
                    />
                </Form>
            </Form.Group>
        </>
    )


}

export default UploadFile;


