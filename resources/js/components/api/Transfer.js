import React, { useState, useEffect } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";


function Transfer(props) {

  const [userSend, setUserSend] = useState([]);
  const [userReceive, setUserReceive] = useState([]);

  const getUserSend = (id) => {

    const params = {
      "id": id,
    }

    axios.get('/user/search', {
      params
    }).then(response => {
      setUserSend(response.data)
      console.log('array :',userSend)
     
    }).catch(error => {
      alert("Error " + error)
    })
  }

  const getUserReceive = (id) => {

    const params = {
      "id": id,
    }

    axios.get('/user/search', {
      params
    }).then(response => {
      setUserReceive(response.data)
      console.log('array :',userReceive)
     
    }).catch(error => {
      alert("Error " + error)
    })
  }

  const save = (id_transaction,asset, from) => {
    axios({
      method: 'post',
      url: 'chain/receive',
      data: {
        transaction: id_transaction,
        asset: asset,
        from: from,
      }
    })
      .then((response) => {
        console.log(response);
        props.getData()
        alert(response.data)
      }, (error) => {
        console.log(error);
      });
  }

  useEffect(() => {
 
    getUserSend(props.sendId)
    getUserReceive(props.receiveId)

  }, []);



  const receiveTransaction = e => {

    //llaves de quien envia
    const sendPublicKey = userSend.publicKey
    const sendPrivateKey = userSend.privateKey

    //llave de quien recibe
    const receivePublickey = userReceive.publicKey

    //id de transaccion
    const txCreatedID = props.transaction

    

    console.log('send :', userSend, 'receive :', userReceive,'transaction :',txCreatedID)

    // metadatos de informacion adicional
    const info = {
      from: userSend.name,
      to: userReceive.name,
      date: new Date().toString()
    }

    //conexion a bigchain
    const BigchainDB = require('bigchaindb-driver')
    const driver = require('bigchaindb-driver')
    const API_PATH = 'https://test.ipdb.io/api/v1/'
    const conn = new driver.Connection(API_PATH)


    console.log(conn.getTransaction(txCreatedID))
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
              info: info
            }
          )
    
        // Sign with the key of the owner of the painting (Alice)
        const signedTransfer = BigchainDB.Transaction
          .signTransaction(createTranfer, sendPrivateKey)
        console.log('tx', signedTransfer)
        return conn.postTransactionCommit(signedTransfer)
      })
      .then(tx => {
         console.log('Transfer Transaction created :','https://test.ipdb.io/api/v1/transactions/'+tx.id)
         save(tx.id,txCreatedID,props.sendId)
      })

  }

  return (
    <div>
      <MDBBtn rounded size="lg" color="info" onClick={receiveTransaction}><MDBIcon far icon="paper-plane" /></MDBBtn>
    </div>
  )
}


export default Transfer;