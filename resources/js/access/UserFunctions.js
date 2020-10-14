import axios from 'axios'
import React from 'react';
import SnackBar from '../components/extra/SnackBar'
import { render } from 'react-dom';

export const newUser = user => {
    render(<></>, document.getElementById('message'));
    return axios
        .post('/user/new/', user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            render(<SnackBar state={true} alert={response.data} type={'success'} />, document.getElementById('message'));
        })
        .catch(err => {
            console.log(err)
            render(<SnackBar state={true} alert={err.data} type={'error'} />, document.getElementById('message'));
        })
}

export const editUser = user => {
    let message = 'No se encuentra ID'
    let type = 'error'
    let result = []
    render(<></>, document.getElementById('message'));
    return axios
        .put('/user/edit/', user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            alert(response.data)
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteUser = user => {
    let message = 'No se encuentra ID'
    let type = 'error'
    let result = []
    render(<></>, document.getElementById('message'));
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
            alert(response.data)
        })
        .catch(err => {
            console.log(err)
        })
}

export const changePass = user => {
    let message = 'No se encuentra ID'
    let type = 'error'
    let result = []
    render(<></>, document.getElementById('message'));
    return axios
        .put('/user/changePass/', user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            alert(response.data)
        })
        .catch(err => {
            console.log(err)
        })
}

export const login = user => {
    render(<></>, document.getElementById('message'));
    return axios
        .post(
            '/user/login', user ,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)

            if (response.data != true) {
                render(<SnackBar state={true} alert={response.data} type={'warning'} />, document.getElementById('message'));
            } else {
                location.reload()
            }

        })
        .catch(err => {
            console.log(err)
            render(<SnackBar state={true} alert={err.data} type={'error'} />, document.getElementById('message'));
        })
}

export const forgot = user => {
    let message = 'No se encuentra ID'
    let type = 'error'
    let result = []
    render(<></>, document.getElementById('message'));
    return axios
        .post(
            '/reset_password_without_token', user ,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
         //   console.log('forgot', response.data)
            alert(response.data)

        })
        .catch(err => {
            console.log(err)
        })
}

export const reset = user => {
    let message = 'No se encuentra ID'
    let type = 'error'
    let result = []
    render(<></>, document.getElementById('message'));
    return axios
        .post(
            '/reset_password_with_token', user ,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
         //   console.log('reset', response.data)
            alert(response.data)
               
        })
        .catch(err => {
            console.log(err.data)
        })
}

export const getProfile = () => {
    let message = 'No se encuentra ID'
    let type = 'error'
    let result = []
    render(<></>, document.getElementById('message'));
    return axios
        .get('/user/my/', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getUser = (user) => {
    let message = 'No se encuentra ID'
    let type = 'error'
    let result = []
    render(<></>, document.getElementById('message'));
    return axios
        .post('/user/search',user,  {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}
