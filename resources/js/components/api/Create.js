import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";


function Create(props) {

  const [user, setUser] = useState([]);


  const getData = e => {

    axios.get('/user/my')
      .then(response => {
        setUser(response.data);
        console.log(response.data)
      }).catch(error => {
        alert("Error " + error)
      })

  };


  const save = (id_transaction,prevTransaction, to) => {
    axios({
      method: 'post',
      url: 'chain/new',
      data: {
        transaction: id_transaction,
        prevTransaction: prevTransaction,
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

  function isset(variable) {
    if(typeof(variable) == "undefined" || variable == null)
        return false;
    else
        if(typeof(variable) == "object" && !variable.length) 
            return false;
        else
            return true;
};

  const createTransaction = e => {

    getData()

    const myPublicKey = user.publicKey
    const myPrivateKey = user.privateKey
    console.log('getData ',props.getData,'getUserSend ',props.getUserSend);
    if (isset(props.getData) && isset(props.getUserSend.hasOwnProperty('values'))){

      const userSend = props.getUserSend.values
      const transaction = props.getData

      const info = {
        from: user.name,
        to: userSend.name,
        commentary:'Inicio',
        date: new Date().toString()
      }

      const BigchainDB = require('bigchaindb-driver')

      const API_PATH = 'https://test.ipdb.io/api/v1/'


      const tx = BigchainDB.Transaction.makeCreateTransaction(
        // Data JSON
        { transaction },

        { info: info },

        // A transaction needs an output
        [BigchainDB.Transaction.makeOutput(
          BigchainDB.Transaction.makeEd25519Condition(myPublicKey))
        ],
        myPublicKey
      )

      // Sign the transaction with private keys
      const txSigned = BigchainDB.Transaction.signTransaction(tx, myPrivateKey)
      // Send the transaction off to BigchainDB
      let conn = new BigchainDB.Connection(API_PATH)

      conn.postTransactionCommit(txSigned)
        .then(res => {
          const elem = API_PATH + 'transactions/' + txSigned.id;
          console.log('Transaction', txSigned.id, 'accepted', 'URL :', elem);
          save(txSigned.id,txSigned.id,userSend.id)
        })
      console.log(txSigned);
    } else {
      alert('Debe ingresar productos y destinatario')
    }
  }

  return (
    <div>
      <MDBBtn className="btn btn-block"  tag="a" size="sm" gradient="blue" onClick={createTransaction}>
      <MDBIcon icon="paper-plane" />
      </MDBBtn>
    </div>
  )
}


export default Create;