
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function Auto(props) {

    const [users, setUsers] = useState([]);


    useEffect(() => {

        axios.get('user/list',
        {data:{
          resp: 'no'
        }})
        .then(response => {
          setUsers(response.data);
          console.log('users :', users)
        }).catch(error => {
          alert("Error " + error)
        })

    }, []);



    return (
        <div>
            <Autocomplete
                id="userToSend"
                size="lg"
                options={users}
                getOptionLabel={option => (option.name)}
                onChange={props.onTagsChange}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Usuario a enviar" variant="outlined" />}
            />
        </div>
    )
}


export default Auto;