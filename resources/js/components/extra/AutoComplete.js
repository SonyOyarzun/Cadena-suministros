
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function Auto(props) {

    const [users, setUsers] = useState([]);

    let params = {}

    if (props.label == 'Usuario a Enviar') {
        params = {resp: 'no'}
    }


    useEffect(() => {

        axios.get('user/list',
            {
                params
            })
            .then(response => {
                setUsers(response.data);
            }).catch(error => {
                console.log("Error " + error)
            }).finally(() => {
                console.log('users :', users)
                console.log('params :', params)
            })

    }, []);



    return (
        <div>
            <Autocomplete
                id="userToSend"
                className='autocomplete'
                size='small'
                options={users}
                getOptionLabel={option => (option.name)}
                onChange={props.onTagsChange}
                renderInput={(params) => <TextField className='autocomplete' {...params} label={props.label} variant="outlined" />}
            />
        </div>
    )
}


export default Auto;