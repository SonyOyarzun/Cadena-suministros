import axios from 'axios'

export const getUser = () => {
    return axios
        .get('user/list', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //   console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getChain = () => {
    return axios
        .get('chain/list', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //   console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProduct = (product) => {
    return axios
        .post('api-product', product, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getMyProduct = () => {
    return axios
        .get('api-myProduct', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log('api-myProduct', response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getConfig = () => {
    return axios
        .get('api-config', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //   console.log(response)
            return response.data[0]
        })
        .catch(err => {
            console.log(err)
        })
}

export const getEditConfig = () => {
    return axios
        .get('api-editConfig', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //   console.log(response)
            return response.data[0]
        })
        .catch(err => {
            console.log(err)
        })
}

