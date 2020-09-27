

import React, { Component, Fragment, useState } from 'react';


function UploadFile() {


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
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        Seleccione Archivo
    </label>
                </div>
            </div>
        </div>
    )


}

export default UploadFile;


