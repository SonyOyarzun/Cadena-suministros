import axios from 'axios'
import { getConfig } from '../tables/TableFunctions'


export const create = (data, metadata, keys, config) => {

  console.log('data :',data,'metadata :',metadata,'keys :',keys,'config :',config,)
  const BigchainDB = require('bigchaindb-driver')
  const tx = BigchainDB.Transaction.makeCreateTransaction(

    { data },

    { metadata },

    [BigchainDB.Transaction.makeOutput(
      BigchainDB.Transaction.makeEd25519Condition(keys.publicKey))
    ],
    keys.publicKey
  )

  console.log('tx',tx);

  const txSigned = BigchainDB.Transaction.signTransaction(tx, keys.privateKey)

  let conn = new BigchainDB.Connection(config.path)

  console.log('txSigned',txSigned);

  return conn.postTransactionCommit(txSigned)
    .then(response => {
      const elem = config.path + config.transaction + txSigned.id;
      console.log('Transaction', txSigned.id, 'aceptada', 'URL :', elem);
      return response
    })
    .catch(error => {
      console.log(error)
      return error
    })

}

export const transfer = (transaction, metadata, keys, config) => {

  const BigchainDB = require('bigchaindb-driver')
  const conn = new BigchainDB.Connection(config.path)

  return conn.getTransaction(transaction.id)
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
            metadata
          }
        )

      const signedTransfer = BigchainDB.Transaction
        .signTransaction(createTranfer, keys.sendPrivateKey)
      console.log('tx', signedTransfer)
      return conn.postTransactionCommit(signedTransfer)
    })
    .then(tx => {
      console.log('Transfer Transaction created :', config.path + config.transaction + tx.id)
      return tx
    })

}


export const searchMetadata = ( search , config ) => {

  const BigchainDB = require('bigchaindb-driver')
  const conn = new BigchainDB.Connection(config.path)

  return conn.searchMetadata(search)
    .then(assets => {
      console.log('Found assets ', assets)
      return assets
    })

}



