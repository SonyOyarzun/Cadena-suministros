import React, { useState, useEffect } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';


function Transfer(props) {

  const [userSend, setUserSend] = useState([]);
  const [userReceive, setUserReceive] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    

  const getUserSend = (id) => {

    const params = {
      "id": id,
    }

    axios.get('/user/search', {
      params
    }).then(response => {
      setUserSend(response.data)
      console.log('userSend :',userSend)
     
    }).catch(error => {
      console.log("Error " + error)
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
      console.log('userReceive :',userReceive)
     
    }).catch(error => {
      console.log("Error " + error)
    })
  }

  const save = (id_transaction,prevTransaction, from) => {
    axios({
      method: 'post',
      url: 'chain/receive',
      data: {
        transaction: id_transaction,
        prevTransaction: prevTransaction,
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
 
    console.log('sendId :',props.sendId,' receiveId :',props.receiveId)
    getUserSend(props.sendId)
    getUserReceive(props.receiveId)

  }, [props.receiveId]); //equivale a onchange para props



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
      commentary: document.getElementById('commentary').value,
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
      <MDBBtn className="btn btn-block"  tag="a" size="sm" gradient="blue" onClick={handleShow}>
      <MDBIcon icon="paper-plane" />
      </MDBBtn>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="commentary">
              <Form.Label>Comentario</Form.Label>
              <Form.Control type="text" rows="3" maxLength="30"/>
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
      </Button>
          <Button variant="primary" onClick={receiveTransaction}>
            Realizar Recepción
      </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


export default Transfer;