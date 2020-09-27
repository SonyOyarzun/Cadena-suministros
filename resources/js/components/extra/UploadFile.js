

import React, { Component, Fragment, useState } from 'react';


function UploadFile() {

    const [file, setFile] = useState('Seleccione Archivo');

    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        setFile(document.getElementById('file').files[0].name)
        console.log(content)

        const params = {
            "file": fileReader,
        }


        axios.post('upload', {
            params
        }).then(response => {
            console.log("resp " + response.data)

        }).catch(error => {
            console.log("Error " + error)
        })
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
                    <span className="input-group-text" id="inputGroupFileAddon01">
                        Cargar
    </span>
                </div>
                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="file"
                        name='file'
                        aria-describedby="inputGroupFileAddon01"
                        onChange={e => handleFileChosen(e.target.files[0])}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        {file}
                    </label>
                </div>
            </div>
        </div>
    )


}

export default UploadFile;


