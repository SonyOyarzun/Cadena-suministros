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


    const pub  = '6ureh2zV5qhChMSvzKCtnddkPzgHbjcJVBG4939uxcXo'
    const priv = '8DxPa3fRFPoVCx7nC7preaJ3ukRhb3MGFNSbZPpSkkvd'
    const id   = 'bf10ec6da7a8058285701c76bd40276b455836dac17e115769d34c3a780b9aad'
    

    const transaction = props.getData

    const info = props.getData

    const BigchainDB = require('bigchaindb-driver')

    const driver = require('bigchaindb-driver')
    const API_PATH = 'https://test.ipdb.io/api/v1/'
    const conn = new driver.Connection(API_PATH)

    const alice = new driver.Ed25519Keypair()
    const bob = new driver.Ed25519Keypair()
    const chris = new driver.Ed25519Keypair()

    console.log('Alice: ', alice.publicKey)
    console.log('Bob: ', bob.publicKey)
    console.log('Chris: ', chris.publicKey)

    // Define the asset to store, in this example
    // we store a bicycle with its serial number and manufacturer

    /*
    let assetdata={}

    assetdata = {
      'bicycle': {
        'serial_number': 'cde',
        'manufacturer': 'Bicycle Inc.',
      }
    }

    var txTransferBobSigned;

    // Construct a transaction payload
    const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
      assetdata,
      { 'meta': 'meta' },
      // A transaction needs an output
      [driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(alice.publicKey))
      ],
      alice.publicKey
    )
*/
let assetdata = {}
const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
  assetdata,
  { 'meta': 'meta' },
  // A transaction needs an output
  [driver.Transaction.makeOutput(
    driver.Transaction.makeEd25519Condition(alice.publicKey))
  ],
  alice.publicKey
)

console.log('tx ',txCreateAliceSimple)

    // Sign the transaction with private keys of Alice to fulfill it
    const txCreateAliceSimpleSigned = driver.Transaction.signTransaction(id, priv)
    
    console.log('\n\nPosting signed create transaction for Alice:\n', txCreateAliceSimpleSigned)

    conn.postTransactionCommit(txCreateAliceSimpleSigned)

      // Transfer bicycle from Alice to Bob
      .then(() => {
        const txTransferBob = driver.Transaction.makeTransferTransaction(
          [{ tx: txCreateAliceSimpleSigned, output_index: 0 }],
          [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(bob.publicKey))],
          { 'newOwner': 'Bob' }
        )

        // Sign with alice's private key
        txTransferBobSigned = driver.Transaction.signTransaction(txTransferBob, priv)
        console.log('\n\nPosting signed transaction to Bob:\n', txTransferBobSigned)

        // Post with commit so transaction is validated and included in a block
        return conn.postTransactionCommit(txTransferBobSigned)
      })

      
      .then(() => conn.listOutputs(pub, true))
      .then(listSpentOutputs => {
        console.log("\nSpent outputs for Alice: ", listSpentOutputs.length) // Spent outputs: 1
        return conn.listOutputs(alice.publicKey, false)
      })
      .then(listUnspentOutputs => {
        console.log("Unspent outputs for Alice: ", listUnspentOutputs.length) // Unspent outputs: 0
        return conn.listOutputs(bob.publicKey, true)
      })
      .then(listSpentOutputs => {
        console.log("\nSpent outputs for Bob: ", listSpentOutputs.length) // Spent outputs: 1
        return conn.listOutputs(bob.publicKey, false)
      })
      .then(listUnspentOutputs => {
        console.log("Unspent outputs for Bob: ", listUnspentOutputs.length) // Unspent outputs: 0
        return conn.listOutputs(chris.publicKey, true)
      })
      .then(listSpentOutputs => {
        console.log("\nSpent outputs for Chris: ", listSpentOutputs.length) // Spent outputs: 0
        return conn.listOutputs(chris.publicKey, false)
      })
      .then(listUnspentOutputs => {
        console.log("Unspent outputs for Chris: ", listUnspentOutputs.length) // Unspent outputs: 1
      })
      .catch(res => { console.log(res) })
  }

  return (
    <div>
      <MDBBtn rounded size="lg" color="info" onClick={receiveTransaction}><MDBIcon far icon="paper-plane" /></MDBBtn>
    </div>
  )
}


export default Send;