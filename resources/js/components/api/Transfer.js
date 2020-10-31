import React, { useState, useEffect } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';

import { receiveChain, getConfig, getTransaction, getAsset } from "../tables/TableFunctions";
import { getUser } from "../../access/UserFunctions";
import { transfer } from "../api/CRAB";
import { getMeter } from "../extra/ExtraFunctions";

import SnackBar from '../extra/SnackBar'
import { render } from 'react-dom';

function Transfer(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [prevent, setPrevent] = useState(false);
  const [message, setMessage] = useState('Realizar Recepción');

  const [commentary, setCommentary] = useState('');


  console.log(props)

  const meter = () => {

      getMeter().then(response => {
        setCommentary('Temperatura: ' + response[response.length - 1][1])
    })

  }



  useEffect(() => {

    meter()

  });




  const save = (id_transaction, asset, from) => {

    const data = {
      transaction: id_transaction,
      asset: asset,
      from: from,
    }

    receiveChain(data).then((response) => {
      setPrevent(false);
      setMessage('Realizar Recepción')
      props.getData()
    }, (error) => {
      console.log(error);

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

      console.log('params ', paramsReceive, paramsSend, paramsTransaction)

      axios.all([
        getUser(paramsSend),
        getUser(paramsReceive),
        getConfig(),
        getTransaction(paramsTransaction),
      ])
        .then(responseArr => {

          console.log('send', responseArr[0])
          console.log('receive', responseArr[1])
          console.log('config', responseArr[2])
          console.log('transaction', responseArr[3])

          receiveTransaction(responseArr[0], responseArr[1], responseArr[2], responseArr[3])

        })

        .catch(error => {
          console.log('send', error)
        })
    } else {
      render(<SnackBar state={true} alert={'Debe ingresar un comentario'} type={'info'} />, document.getElementById('message'));
    }


  }



  const receiveTransaction = (userSend, userReceive, config, transaction) => {

    console.log('transaction asset :', transaction)
    //llaves de quien envia


    let asset = null

    console.log('transaction operation :', transaction.operation)
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

    const keys = {
      receivePublickey: userReceive.publicKey,
      sendPrivateKey: userSend.privateKey,
    }
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

    transfer(transaction, info, keys, config).then(response => {
      setPrevent(false);
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
              {props.switch  ? (
                <Form.Control type="text" rows="3" maxLength="30" defaultValue={commentary} value={commentary} />
              ):(
                <Form.Control type="text" rows="3" maxLength="30" defaultValue=''/>
              )
              }

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