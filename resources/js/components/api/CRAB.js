import axios from 'axios'
import { getConfig } from '../tables/TableFunctions'


export const create = (data, metadata, keys, config) => {

    const BigchainDB = require('bigchaindb-driver')

    let API_PATH = config.path

    const tx = BigchainDB.Transaction.makeCreateTransaction(

        { data },

        { metadata: metadata },

        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(keys.publicKey))
        ],
        keys.publicKey
    )

    const txSigned = BigchainDB.Transaction.signTransaction(tx, keys.privateKey)

    let conn = new BigchainDB.Connection(API_PATH)

    return conn.postTransactionCommit(txSigned)
        .then(response => {
            const elem = API_PATH + config.transaction + txSigned.id;
            console.log('Transaction', txSigned.id, 'aceptada', 'URL :', elem);
            return response
        })
        .catch(error => {
            console.log(error)
            return error
        })

}

export const transfer = (data, metadata,keys) => {

    const BigchainDB = require('bigchaindb-driver')
    
    let config = []

    getConfig().then(response => {
        config  = response.path
    })

    let API_PATH = config.path

    let asset = null

    console.log('transaction operation :', data.operation)
    switch (data.operation) {
      case 'CREATE':
        asset = data.id
        console.log('CREATE :', asset)
        break;
      case 'TRANSFER':
        asset = data.asset.id
        console.log('TRANSFER :', asset)
        break;

      default:
        break;
    }

    return conn.getTransaction(txCreatedID)
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
                keys.receivePublickey))],
            {
              info: info
            }
          )

        // Sign with the key of the owner of the painting (Alice)
        const signedTransfer = BigchainDB.Transaction
          .signTransaction(createTranfer, keys.sendPrivateKey)
        console.log('tx', signedTransfer)
        return conn.postTransactionCommit(signedTransfer)
      })
      .then(tx => {
        console.log('Transfer Transaction created :', config.path + config.transaction + tx.id)
        console.log('Save Transaction :', tx.id, asset, props.sendId)
        save(tx.id, asset, props.sendId)
      })

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
        console.log('Save Transaction :', tx.id, asset, props.sendId)
        save(tx.id, asset, props.sendId)
      })




  }