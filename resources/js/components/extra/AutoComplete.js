
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function Auto(props) {

    const [users, setUsers] = useState([]);

    const params = {
        resp: 'no'
    }



    useEffect(() => {

        axios.get('user/list',
            {
                params
            })
            .then(response => {
                setUsers(response.data);
                console.log('users :', users)
            }).catch(error => {
                console.log("Error " + error)
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
                renderInput={(params) => <TextField className='autocomplete' {...params} label="Usuario a enviar" variant="outlined" />}
            />
        </div>
    )
}


export default Auto;