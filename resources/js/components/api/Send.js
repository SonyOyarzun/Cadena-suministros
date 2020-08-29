import React, { useState } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";


function Send(props) {

const save = (id_transaction,to) =>{
  axios({
    method: 'post',
    url: '/transaction/new',
    data: {
      id:    id_transaction,
      to:    to,
    }
  })
    .then((response) => {
      console.log(response);
      alert(response.data)
    }, (error) => {
      console.log(error);
    });
}


  const sendTransaction = e => {

    const transaction = props.getData

    const info = props.getData

    const BigchainDB = require('bigchaindb-driver')
    //const API_PATH = 'http://192.168.99.100:9984/api/v1/'
    //https://test.ipdb.io/api/v1/transactions/63b1c9f795448346b501f20b259edea95627033403cb7ab20a3e53668912ee47
    const API_PATH = 'https://test.ipdb.io/api/v1/'

    // Create a new keypair.
    const alice = new BigchainDB.Ed25519Keypair()

    // Construct a transaction payload
    const tx = BigchainDB.Transaction.makeCreateTransaction(
      // Data JSON
      { transaction },

      // Metadata contains information about the transaction itself
      // (can be `null` if not needed)
      { info: info },

      // A transaction needs an output
      [BigchainDB.Transaction.makeOutput(
        BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))
      ],
      alice.publicKey
    )

    // Sign the transaction with private keys
    const txSigned = BigchainDB.Transaction.signTransaction(tx, alice.privateKey)

    // Send the transaction off to BigchainDB
    let conn = new BigchainDB.Connection(API_PATH)

    conn.postTransactionCommit(txSigned)
      .then(res => {
        const elem = API_PATH + 'transactions/' + txSigned.id;
        console.log('Transaction', txSigned.id, 'accepted', 'URL :',elem);
      })
    console.log(txSigned);

    save(txSigned.id,'2')
    // Check console for the transaction's status
    //http://docs.bigchaindb.com/en/latest/query.html

  }

  return (
    <div>
     <MDBBtn rounded size="lg" color="info" onClick={sendTransaction}>Realizar Envio <MDBIcon icon="paper-plane" /></MDBBtn>
    </div>
  )
}


export default Send;