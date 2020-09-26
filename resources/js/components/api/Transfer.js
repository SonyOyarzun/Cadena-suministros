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

  const [prevent, setPrevent] = useState(false);
  const [message, setMessage] = useState('Realizar Recepción');
    
/*
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
*/
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

  /*
  useEffect(() => {
 
    console.log('sendId :',props.sendId,' receiveId :',props.receiveId)
    getUserSend(props.sendId)
    getUserReceive(props.receiveId)

  }, [props.receiveId]); //equivale a onchange para props
*/

  const process = () => {

    if(document.getElementById('commentary').value.trim().length > 0){

    const paramsSend = {
      "id": props.sendId,
    }

    const paramsReceive = {
      "id": props.receiveId,
    }

    const paramsTransaction = {
      "asset": props.transaction,
    }

    console.log(paramsReceive,paramsSend)

    axios.all([
      axios.get('/user/search', {params:paramsSend}),
      axios.get('/user/search', {params:paramsReceive}),
      axios.get('/json-api/config'),
      axios.get('transaction', {params:paramsTransaction}),
    ])
    .then(responseArr => {
      receiveTransaction(responseArr[0].data,responseArr[1].data,responseArr[2].data,responseArr[3].data)
      console.log('send',responseArr[0].data)
      console.log('receive',responseArr[1].data)
      console.log('config',responseArr[2].data)
      console.log('transaction',responseArr[3].data)
    })

    .catch(error => {
      console.log('send', error[0])
      console.log('receive', error[1])
      console.log('config', error[2])
      console.log('transaction', error[3])
    })
  }else{
    alert('Debe ingresar un comentario')
  }
  

  }



  const receiveTransaction = (userSend,userReceive,config,transaction) => {

    console.log('asset?',transaction.id)
    setPrevent(true)
    setMessage('Cargando...')
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
    const API_PATH = config[0].path
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
         console.log('Transfer Transaction created :',config[0].path+config[0].transaction+tx.id)
         save(tx.id,transaction.id,props.sendId)
         setTimeout(function() {
          setPrevent(false);
          setMessage('Realizar Recepción')
        }, 5000);
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
          <Button variant="primary" onClick={process} disabled={prevent}>
            {message}
      </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


export default Transfer;