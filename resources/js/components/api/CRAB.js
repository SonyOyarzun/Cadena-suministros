import axios from 'axios'


export const create = (data, metadata, config) => {

    const BigchainDB = require('bigchaindb-driver')
    const keys = new BigchainDB.Ed25519Keypair()
    const API_PATH = config.path

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

    conn.postTransactionCommit(txSigned)
        .then(res => {
            const elem = API_PATH + config.transaction + txSigned.id;
            console.log('Transaction', txSigned.id, 'aceptada', 'URL :', elem);
        })

}

export const editUser = user => {
    return axios
        .put('/user/edit/', user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const deleteUser = user => {
    return axios({
        method: 'delete',
        url: '/user/delete/',
        data: {
            id: user.id,
        }
    }
    )
        .then(response => {
            console.log(response)
            return response.data

        }).catch(err => {
            console.log(err)
            return []
        })
}

export const changePass = user => {
    return axios
        .put('/user/changePass/', user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            return response.data

        }).catch(err => {
            console.log(err)
            return []
        })
}
