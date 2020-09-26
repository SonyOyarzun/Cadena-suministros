import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";


function Create(props) {

  console.log('props ', props)

  const [prevent, setPrevent] = useState(false);



  //useEffect(() => {

    const process = () => {
      axios.all([
        axios.get('/user/my'),
        axios.get('/json-api/config'),
      ])
      .then(responseArr => {
        createTransaction(responseArr[0].data,responseArr[1].data)
        console.log('my',responseArr[0].data)
        console.log('config',responseArr[1].data)
      })

      .catch(error => {
        console.log('my', error[0])
        console.log('config', error[1])
      })
    }

  //}, []);

  const save = (id_transaction, prevTransaction, to) => {
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
    if (typeof (variable) == "undefined" || variable == null)
      return false;
    else
      if (typeof (variable) == "object" && !variable.length)
        return false;
      else
        return true;
  };

  const createTransaction = (user,config) => {

    setPrevent(true)

    const myPublicKey = user.publicKey
    const myPrivateKey = user.privateKey
    //console.log('getData ',props.getData,'getUserSend ',props.getUserSend);
    if (isset(props.getData) && props.getUserSend.hasOwnProperty('values')) {

      const userSend = props.getUserSend.values
      const transaction = props.getData

      const info = {
        from: user.name,
        to: userSend.name,
        commentary: 'Inicio',
        date: new Date().toString()
      }

      console.log('path',config.path)
      const BigchainDB = require('bigchaindb-driver')

      const API_PATH = config[0].path


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
          const elem = API_PATH + config[0].transaction + txSigned.id;
          console.log('Transaction', txSigned.id, 'accepted', 'URL :', elem);
          save(txSigned.id, txSigned.id, userSend.id)

          setTimeout(function() {
            setPrevent(false);
          }, 5000);
         
        })
      console.log(txSigned);

      
    } else {
      alert('Debe ingresar productos y destinatario')
      setPrevent(false);
    }
    

  }

  return (
    <div>
      <MDBBtn className="btn btn-block" tag="a" size="sm" gradient="blue" onClick={process}  disabled={prevent}>
        <MDBIcon icon="paper-plane" />
      </MDBBtn>
    </div>
  )
}



export default Create;