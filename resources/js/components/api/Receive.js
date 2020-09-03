import React, { useState, useEffect } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";
import { data } from 'jquery';


function Send(props) {

  const [userSend, setUserSend] = useState([]);
  const [userReceive, setUserReceive] = useState([]);

  useEffect(() => {


    console.log(props)

    const params = {
      "id": props.sendId,
    }

    axios.get('/user/search',{
      params
    }).then(response => {
        setUserSend(response.data);
        console.log('send :',response.data)
      }).catch(error => {
        alert("Error " + error)
      })


      const params2 = {
        "id": props.receiveId,
      }
  
      axios.get('/user/search',{
        params2
      })
      .then(response => {
        setUserReceive(response.data);
        console.log('receive :',response.data)
      }).catch(error => {
        alert("Error " + error)
      })

  }, []);

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

    //llaves de quien envia
    const sendId = props.sendId
    const sendPublicKey = userSend.sendPublicKey
    const sendPrivateKey = userSend.sendPrivateKey

    //llave de quien recibe
    const receivePublickey = userReceive.sendPublicKey

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