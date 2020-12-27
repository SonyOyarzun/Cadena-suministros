import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

import { getConfig, newChain, productReply, productExist } from "../tables/TableFunctions";
import { getProfile } from "../../access/UserFunctions";
import { create } from "../api/CRAB";
import { keys } from 'lodash';

import Load from '../extra/Load'

import SnackBar from '../extra/SnackBar'
import { render } from 'react-dom';



function Create(props) {

  console.log('props ', props)
  const [alert, setAlert] = useState('');
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);

  const process = () => {
    axios.all([
      getProfile(),
      getConfig(),
    ])
      .then(responseArr => {
        createTransaction(responseArr[0], responseArr[1])
        console.log('todo', responseArr)
        console.log('my', responseArr[0])
        console.log('config', responseArr[1])
      })

      .catch(error => {
        console.log('todo', error)
        console.log('my', error[0])
        console.log('config', error[1])
      })
  }



  const save = (id_transaction, asset, to) => {
    const data = {
      transaction: id_transaction,
      asset: asset,
      to: to,
    }

    newChain(data).then(response => {
      console.log('new chain :', response)
      setAlert(response.message)
      setType(response.type)
    })

  }

  function isset(variable) {
    if (typeof (variable) == "undefined" || variable == null)
      return false;
    else
      if (typeof (variable) == "object" && !variable.length)
        return false;
      else
        return true;
  };

  const createTransaction = (user, config) => {
    render(<Load />, document.getElementById('load'));
    setShow(false)
    const keys = {
      publicKey: user.publicKey,
      privateKey: user.privateKey,
    }
    //console.log('getData ',props.getData,'getUserSend ',props.getUserSend);
    if (isset(props.getData) && props.getUserSend.hasOwnProperty('values')) {

      const userSend = props.getUserSend.values
      const transaction = props.getData

      const info = {
        from: user.name,
        to: userSend.name,
        commentary: 'Inicio',
        state: 'enviado',
        date: new Date().toString()
      }

      productExist(transaction).then(response => {
        console.log('product Exist :', response)

        if (response == true) {

          create(transaction, info, keys, config)

            .then(response => {
              save(response.id, response.id, userSend.id)
              productReply(transaction).then(response => {
                console.log('product Reply :', response)
                props.updateData()
                setShow(true)
                props.clean()
              })
            })
            .catch(response => {
              console.log('error create :', response)
            })
            .finally(() => {
              setTimeout(() => {
                render(<></>, document.getElementById('load'));
                setShow(false)
              }, 10000);

            })


        } else {
          render(<></>, document.getElementById('load'));
          setShow(false)
          props.updateData()
        }


      })


    } else {
      setAlert('Debe ingresar productos y destinatario')
      setType('warning')
      render(<></>, document.getElementById('load'));
      setShow(false)
    }

  }

  return (
    <div>
      {show != false &&
        <SnackBar show={show} alert={alert} type={type} />
      }
      <MDBBtn className="btn btn-block" tag="a" size="sm" gradient="blue" onClick={process}>
        <MDBIcon icon="paper-plane" />
      </MDBBtn>
    </div>
  )


}



export default Create;