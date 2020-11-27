import axios from 'axios'


export const getUser = () => {
    return axios
        .get('/user/list', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //   console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const getChain = () => {
    return axios
        .get('/chain/list', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const newChain = (chain) => {
    return axios
        .post('/chain/new', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const reSendChain = (chain) => {
    return axios
        .post('/chain/reSend', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const receiveChain = (chain) => {
    return axios
        .post('/chain/receive', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const viewNotification = () => {
    return axios
        .post('/chain/viewNotification', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const productReply = (product) => {
    return axios
        .post('/product/new', product, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const productExist = (product) => {
    return axios
        .post('/product/exist', product, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return false
        })
}

export const productList = () => {
    return axios
        .get('/product/list', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const getTransaction = (transaction) => {
    return axios
        .post('/transaction', transaction, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const getAsset = (asset) => {
    return axios
        .post('/assets', asset, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const searchAsset = (asset) => {
    return axios
        .post('/search', asset, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const searchMetadata = (asset) => {
    return axios
        .post('/searchMetadata', asset, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log('length :',response.data)
            if (response.data[0].metadata.hasOwnProperty('metadata')) {
                return response.data[0].metadata.metadata.meterPack
            } else {
                return false
            }
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const getProduct = (product) => {
    return axios
        .post('/api-product', product, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const getMyProduct = () => {
    return axios
        .get('/api-myProduct', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const getConfig = () => {
    return axios
        .get('/api-config', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //   console.log(response)
            return response.data[0]
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const editConfig = () => {
    return axios
        .put('/api-editConfig', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data[0]
        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const senPush = () => {
    return axios
        .post('/send-push', {
            headers: {
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
        .then(response => {
            console.log(response)

        })
        .catch(err => {
            console.log(err)
        })
}