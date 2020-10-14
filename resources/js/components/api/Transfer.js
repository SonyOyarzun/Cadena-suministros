import React, { useState, useEffect } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';

import { receiveChain , getConfig, getTransaction} from "../tables/TableFunctions";
import { getUser } from "../../access/UserFunctions";

import SnackBar from '../extra/SnackBar'
import { render } from 'react-dom';

function Transfer(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [prevent, setPrevent] = useState(false);
  const [message, setMessage] = useState('Realizar Recepción');


  const save = (id_transaction, asset, from) => {

    const data = {
      transaction: id_transaction,
      asset: asset,
      from: from,
    }

    receiveChain(data).then((response) => {
      render(<></>, document.getElementById('message'));

    //  console.log('receive transaction',response);
      props.getData()
      setPrevent(false);
      setMessage('Realizar Recepción')
    }, (error) => {
      console.log(error);
      render(<SnackBar state={true} alert={error} type={'error'} />, document.getElementById('message'));
    });
  }


  const process = () => {

    render(<></>, document.getElementById('message'));

    if (document.getElementById('commentary').value.trim().length > 0) {

      setPrevent(true)
      setMessage('Cargando...')

      const paramsSend = {
        "id": props.sendId,
      }

      const paramsReceive = {
        "id": props.receiveId,
      }

      const paramsTransaction = {
        "asset": props.transaction,
      }

      console.log(paramsReceive, paramsSend)

      axios.all([
        getUser(paramsSend),
        getUser(paramsReceive),
        getConfig(),
        getTransaction(paramsTransaction),
      ])
        .then(responseArr => {
          receiveTransaction(responseArr[0], responseArr[1], responseArr[2], responseArr[3])
          console.log('send', responseArr[0])
          console.log('receive', responseArr[1])
          console.log('config', responseArr[2])
          console.log('transaction', responseArr[3])
        })

        .catch(error => {
          console.log('send', error[0])
          console.log('receive', error[1])
          console.log('config', error[2])
          console.log('transaction', error[3])
        })
    } else {
      render(<SnackBar state={true} alert={'Debe ingresar un comentario'} type={'info'} />, document.getElementById('message'));
    }


  }



  const receiveTransaction = (userSend, userReceive, config, transaction) => {

    render(<></>, document.getElementById('message'));
    console.log('transaction asset :', transaction)
    //llaves de quien envia


    let asset = null

    switch (transaction.operation) {
      case 'CREATE':
        asset = transaction.id
        console.log('CREATE :', asset)
        break;
      case 'TRANSFER':
        asset = transaction.asset.id
        console.log('TRANSFER :', asset)
        break;

      default:
        break;
    }


    const sendPublicKey = userSend.publicKey
    const sendPrivateKey = userSend.privateKey

    //llave de quien recibe
    const receivePublickey = userReceive.publicKey

    //id de transaccion
    const txCreatedID = props.transaction

    // console.log('send :', userSend, 'receive :', userReceive,'transaction :',txCreatedID)

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
    const API_PATH = config.path
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
        console.log('Transfer Transaction created :', config.path + config.transaction + tx.id)
        save(tx.id, asset, props.sendId)
        render(<SnackBar state={true} alert={'Transaccion Transferida'} type={'success'} />, document.getElementById('message'));
      })




  }

  return (
    <div>
      <MDBBtn className="btn btn-block" tag="a" size="sm" gradient="blue" onClick={handleShow}>
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
              <Form.Control type="text" rows="3" maxLength="30" />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
      </Button>
          <Button variant="primary" onClick={process} disabled={prevent}>
            {message}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


export default Transfer;