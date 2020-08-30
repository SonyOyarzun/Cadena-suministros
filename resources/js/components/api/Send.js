import React, { useState } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";


function Send(props) {

const save = (id_transaction,pubkey,privkey,to) =>{
  axios({
    method: 'post',
    url: 'chain/new',
    data: {
      transaction:  id_transaction,
      public:       pubkey,
      private:      privkey,
      to:           to,
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

    const publicKey  = ''
    const privateKey = ''

    const transaction = props.getData

    const info = props.getData

    const BigchainDB = require('bigchaindb-driver')

    const API_PATH = 'https://test.ipdb.io/api/v1/'

    //const alice = new BigchainDB.Ed25519Keypair()
    

    const tx = BigchainDB.Transaction.makeCreateTransaction(
      // Data JSON
      { transaction },

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
        save(txSigned.id,'1')
      })
    console.log(txSigned);

  }

  return (
    <div>
     <MDBBtn rounded size="lg" color="info" onClick={sendTransaction}>Realizar Envio <MDBIcon icon="paper-plane" /></MDBBtn>
    </div>
  )
}


export default Send;