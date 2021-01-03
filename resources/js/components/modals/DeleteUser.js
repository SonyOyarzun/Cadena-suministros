import React, { useState } from 'react';
import { deleteUser } from '../../access/UserFunctions'
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

import SnackBar from '../../components/extra/SnackBar'
import { render } from 'react-dom';

function DeleteUser(props) {


const onSubmit = (e) => {
  e.preventDefault()
  render(<></>, document.getElementById('message'));
//  console.log(props)
  const data = {
      id: props.id
  }
  deleteUser(data).then(response => {
    alert(response.message)
  //  render(<SnackBar state={true} alert={response.message} type={response.type} />, document.getElementById('message'));
    props.getData()
  })

}
  return (
    <div>
      <MDBBtn tag="a" size="sm" gradient="blue" onClick={onSubmit}>
        <MDBIcon far icon="trash-alt" />
      </MDBBtn>  
    </div>
  )
}


export default DeleteUser;