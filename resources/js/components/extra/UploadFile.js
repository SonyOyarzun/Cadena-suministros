

import React, { Component, Fragment, useState } from 'react';


function UploadFile() {

    const [file, setFile] = useState('Seleccione Archivo');

    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        setFile(document.getElementById('file').files[0].name)
        console.log(content)


        let formData = new FormData();
        formData.append('file', document.getElementById('file').files[0]);

        axios.post('upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function(data) {
          
            console.log('success');
        }.bind(this)).catch(function(data) {
            console.log('error');
        });
        // … do something with the 'content' …
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    const submitFiles =()=> {
        for( let i = 0; i < this.files.length; i++ ){
            if(this.files[i].id) {
                continue;
            }
            let formData = new FormData();
            formData.append('file', this.files[i]);
    
            axios.post('/' + this.post_url,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function(data) {
                this.files[i].id = data['data']['id'];
                this.files.splice(i, 1, this.files[i]);
                console.log('success');
            }.bind(this)).catch(function(data) {
                console.log('error');
            });
        }
    }

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


