import React, { useState } from 'react';
import { deleteUser } from '../../access/UserFunctions'
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

function DeleteUser(props) {


const onSubmit = (e) => {
  e.preventDefault()
  console.log(props)

  const data = {
      id: props.id
  }

  deleteUser(data).then(res => {
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