import axios from 'axios'
import React from 'react';
import SnackBar from '../extra/SnackBar'
import { render } from 'react-dom';


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
        })
}

export const getChain = () => {
    return axios
        .get('/chain/list', {
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

export const newChain = (chain) => {
    return axios
        .post('/chain/new', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //console.log(response.data)
            alert(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const reSendChain = (chain) => {
    return axios
        .post('/chain/reSend', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //console.log(response.data)
            alert(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const receiveChain = (chain) => {
    return axios
        .post('/chain/receive', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //console.log(response.data)
            alert(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getTransaction = (transaction) => {
    return axios
        .post('/transaction', transaction, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
        //    console.log(response.data)

            if (response.data.asset.data.hasOwnProperty('transaction')) {
                return response.data.asset.data.transaction
            } else {
                render(<SnackBar state={true} alert={'No se encuentra ID'} type={'error'} />, document.getElementById('message'));
                return []
            }

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
         //   console.log('assets', response.data)

            if (response.data.length > 0) {

                if (response.data[0].hasOwnProperty('metadata')) {

                    if (response.data[0].metadata.hasOwnProperty('info')) {
                        render(<SnackBar state={true} alert={'Transaccion encontrada'} type={'success'} />, document.getElementById('message'));
                        return response.data
                    } else {
                        return []
                    }

                } else {
                    render(<SnackBar state={true} alert={'No se encuentra ID'} type={'error'} />, document.getElementById('message'));
                    return []
                }
            } else {
                render(<SnackBar state={true} alert={'No se encuentra ID'} type={'error'} />, document.getElementById('message'));
                return []
            }

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
            //  console.log('search :',response.data)
            console.log('asset :', asset)
            //    alert(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
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
        })
}

export const getEditConfig = () => {
    return axios
        .get('/api-editConfig', {
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

/**
   <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>
 */