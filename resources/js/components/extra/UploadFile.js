

import React, { Component, Fragment, useState } from 'react';


function UploadFile(props) {

    let url = 'upload'
    let type = ''


    switch (props.type) {

        case 'logotype':
            url = 'uploadLogotype'
            type = 'logotipo'

            break;

        case 'background':
            url = 'uploadBackground'
            type = 'fondo de pantalla'
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
        });
        // … do something with the 'content' …
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };


    return (
        <div>

            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text darkLight" id="inputGroupFileAddon01">
                        {type}
    </span>
                </div>
                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input darkLight"
                        id={url}
                        name={url}
                        aria-describedby="inputGroupFileAddon01"
                        onChange={e => handleFileChosen(e.target.files[0])}
                        style={{cursor: 'pointer'}}
                    />
                    <label className="custom-file-label darkLight" htmlFor="inputGroupFile01" >
                        {file}
                    </label>
                </div>
            </div>

        </div>
    )


}

export default UploadFile;


