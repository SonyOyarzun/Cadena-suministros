import React, { useState, useEffect } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";
import { data } from 'jquery';


function Send(props) {

  const [userSend, setUserSend] = useState([]);
  const [userReceive, setUserReceive] = useState([]);

  const getUsers = (id) => {

    const params = {
      "id": id,
    }

    axios.get('/user/search', {
      params
    }).then(response => {
      console.log('response :',response.data)
      return response.data;
    }).catch(error => {
      alert("Error " + error)
    })

  }


  const save = (id_transaction, to) => {
    axios({
      method: 'post',
      url: 'chain/new',
      data: {
        transaction: id_transaction,
        to: to,
      }
    })
      .then((response) => {
        console.log(response);
        alert(response.data)
      }, (error) => {
        console.log(error);
      });
  }



  const receiveTransaction = e => {

    const sendId = props.sendId
    const receiveId = props.receiveId

    const userSend = getUsers(sendId)
    const userReceive = getUsers(receiveId)

    console.log(getUsers(sendId))
    //llaves de quien envia
    const sendPublicKey = userSend.publicKey
    const sendPrivateKey = userSend.privateKey

    //llave de quien recibe
    const receivePublickey = userReceive.publicKey

    console.log('send :', userSend, 'receive :', userReceive)

    //id de transaccion
    const txCreatedID = props.transaction

    // metadatos de informacion adicional
    const info = null

    //conexion a bigchain
    const BigchainDB = require('bigchaindb-driver')
    const driver = require('bigchaindb-driver')
    const API_PATH = 'https://test.ipdb.io/api/v1/'
    const conn = new driver.Connection(API_PATH)



    // Get transaction payload by ID
    conn.getTransaction(txCreatedID)
      .then((txCreated) => {
        const createTranfer = BigchainDB.Transaction.
          makeTransferTransaction(
            // The output index 0 is the one that is being spent
            [{
              tx: txCreated,
              output_index: 0
            }],
            [BigchainDB.Transaction.makeOutput(
              BigchainDB.Transaction.makeEd25519Condition(
                receivePublickey))],
            {
              info: null
            }
          )
        // Sign with the key of the owner of the painting (Alice)
        const signedTransfer = BigchainDB.Transaction
          .signTransaction(createTranfer, sendPrivateKey)
        console.log('tx', signedTransfer)
        conn.postTransactionCommit(signedTransfer)
      })
      .then(res => {
        //    document.body.innerHTML += '<h3>Transfer Transaction created</h3>'
        //   document.body.innerHTML += res.id
        console.log('Transfer Transaction created :', res.id)
      })

  }

  return (
    <div>
      <MDBBtn rounded size="lg" color="info" onClick={receiveTransaction}><MDBIcon far icon="paper-plane" /></MDBBtn>
    </div>
  )
}


export default Send;