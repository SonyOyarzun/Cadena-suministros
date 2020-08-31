import React, { useState } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";


function Send(props) {

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

    const publicKey = '5bAAdgeKRpaiQ75onTGaBjkGM6HZ9GiCD2Xhv3pA9Ksq'
    const privateKey = '9YKU2mvEUe6DMYiCguef6knTwdCvjmykXXHB1VznYLAH'

    const txCreatedID = '0aa9ea73a397679a5889be38e325ef231f90ea8997e89afa2a7f9635220f7cef'


    const transaction = props.getData

    const info = props.getData

    const BigchainDB = require('bigchaindb-driver')

    const driver = require('bigchaindb-driver')
    const API_PATH = 'https://test.ipdb.io/api/v1/'
    const conn = new driver.Connection(API_PATH)

    const newOwner = new driver.Ed25519Keypair()

    //pruebas
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
                newOwner.publicKey))],
            {
              info: null
            }
          )
        // Sign with the key of the owner of the painting (Alice)
        const signedTransfer = BigchainDB.Transaction
          .signTransaction(createTranfer, privateKey)
        console.log('tx', signedTransfer)
        conn.postTransactionCommit(signedTransfer)
      })
      .then(res => {
        //    document.body.innerHTML += '<h3>Transfer Transaction created</h3>'
        //   document.body.innerHTML += res.id
        console.log('Transfer Transaction created :', res.id)
      })



    ////////////////////////


  }

  return (
    <div>
      <MDBBtn rounded size="lg" color="info" onClick={receiveTransaction}><MDBIcon far icon="paper-plane" /></MDBBtn>
    </div>
  )
}


export default Send;