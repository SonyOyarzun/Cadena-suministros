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
    render(<></>, document.getElementById('message'));
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
    render(<></>, document.getElementById('message'));
    return axios
        .post('/chain/new', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //console.log(response.data)
            render(<SnackBar state={true} alert={response.data} type={'info'} />, document.getElementById('message'));
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const reSendChain = (chain) => {
    render(<></>, document.getElementById('message'));
    return axios
        .post('/chain/reSend', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //console.log(response.data)
            render(<SnackBar state={true} alert={response.data} type={'info'} />, document.getElementById('message'));
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const receiveChain = (chain) => {
    render(<></>, document.getElementById('message'));
    return axios
        .post('/chain/receive', chain, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //console.log(response.data)
            render(<SnackBar state={true} alert={response.data} type={'info'} />, document.getElementById('message'));
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getTransaction = (transaction) => {
    render(<></>, document.getElementById('message'));
    return axios
        .post('/transaction', transaction, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            //    console.log(response.data)
            if (response.data.asset.data.hasOwnProperty('transaction')) {

                return  response.data.asset.data.transaction
            }else{

                render(<SnackBar state={true} alert={response.data} type={'error'} />, document.getElementById('message'));
            } 

        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const getAsset = (asset) => {

    let message = 'No se encuentra ID'
    let type = 'error'
    let result = []
    render(<></>, document.getElementById('message'));

    return axios
        .post('/assets', asset, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            
            if (response.data.length > 0) {

                if (response.data[0].hasOwnProperty('metadata')) {

                    if (response.data[0].metadata.hasOwnProperty('info')) {
                        message = 'Transaccion encontrada'
                        type = 'success'
                        result = response.data
                    } 
                } 
            } 

            render(<SnackBar state={true} alert={message} type={type} />, document.getElementById('message'));
            return result
        })
        .catch(err => {
            console.log(err)
            render(<SnackBar state={true} alert={err} type={'error'} />, document.getElementById('message'));
            return result
        })
}

export const searchAsset = (asset) => {
    render(<></>, document.getElementById('message'));
    return axios
        .post('/search', asset, {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            render(<SnackBar state={true} alert={response.data} type={'info'} />, document.getElementById('message'));
            return response.data
        })
        .catch(err => {
            console.log(err)
            render(<SnackBar state={true} alert={err} type={'error'} />, document.getElementById('message'));
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
    render(<></>, document.getElementById('message'));
    return axios
        .get('/api-editConfig', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data[0]
        })
        .catch(err => {
            console.log(err)
            render(<SnackBar state={true} alert={err} type={'error'} />, document.getElementById('message'));
        })
}

/**
   <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>
 */