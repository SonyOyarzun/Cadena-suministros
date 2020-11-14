import axios from 'axios'
import { getConfig } from '../tables/TableFunctions'


export const create = (data, metadata, keys, config) => {

  //  console.log('keys',keys)
    const BigchainDB = require('bigchaindb-driver')
    const tx = BigchainDB.Transaction.makeCreateTransaction(

        { data },

        { metadata: metadata },

        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(keys.publicKey))
        ],
        keys.publicKey
    )
    
    const txSigned = BigchainDB.Transaction.signTransaction(tx, keys.privateKey)

    let conn = new BigchainDB.Connection(config.path)

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

export const transfer = (transaction, metadata,keys, config) => {

    const BigchainDB = require('bigchaindb-driver')
    const driver = require('bigchaindb-driver')
    const conn = new driver.Connection(config.path)

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


export const append = (transaction, metadata,keys, config) => {

    const BigchainDB = require('bigchaindb-driver')
    const driver = require('bigchaindb-driver')
    const conn = new driver.Connection(config.path)

 
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
                keys.publickey))],
            {
              metadata
            }
          )

        // Sign with the key of the owner of the painting (Alice)
        const signedTransfer = BigchainDB.Transaction
          .signTransaction(createTranfer, keys.privateKey)
        console.log('tx', signedTransfer)
        return conn.postTransactionCommit(signedTransfer)
      })
      .then(tx => {
        console.log('Transfer Transaction created :', config.path + config.transaction + tx.id)
        return tx
      })

}

export const burn = (transaction, config) => {


  const BigchainDB = require('bigchaindb-driver')
  const driver = require('bigchaindb-driver')
  const conn = new driver.Connection(config.path)

  const BURN_ADDRESS = 'BurnBurnBurnBurnBurnBurnBurnBurnBurnBurnBurn'

  transaction.map((data,index)=>{

    driver.Transaction.makeTransferTransaction(

      [{ tx: data, output_index: 0 }],
      [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(BURN_ADDRESS))],
      //modified metadata
      {'status':'Burned'}
  
  ).then(tx => {
    tx.map((data,index)=>{
    console.log('burn Transaction :', config.path + config.transaction + data.id)

    })
    return tx
  })

  })

driver.Transaction.makeTransferTransaction(

    [{ tx: assetCreateTxSigned, output_index: 0 }],
    [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(BURN_ADDRESS))],
    //modified metadata
    {'status':'Burned'}

);


}

