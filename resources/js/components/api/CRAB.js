import axios from 'axios'
import { getConfig } from '../tables/TableFunctions'


export const create = (data, metadata, keys, config) => {

    console.log('data',data,'metadata',metadata,'keys',keys,'config',config)
    const BigchainDB = require('bigchaindb-driver')
    console.log('1',keys.publicKey,keys.privateKey)
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

    console.log('2')
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

    return conn.getTransaction(asset)
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

        // Sign with the key of the owner of the painting (Alice)
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
