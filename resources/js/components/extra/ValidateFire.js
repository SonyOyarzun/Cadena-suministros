import React, { Component, Fragment, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import fire from '../extra/FireBase'

function ValidateFire(props) {

  const messaging = fire.messaging();
 
  messaging
    .requestPermission()
    .then(function () {
        return messaging.getToken()
    })
    .then(function (token) {
        console.log(token)
  
        const params = {
        fcm_token: token
        }
  
        axios
            .post('/save-device-token', params,{
                headers: {
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
            .then(response => {
                console.log(response.data)
  
            })
            .catch(err => {
                console.log(err)
            })
  
  
    })
    .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
    })
  

return null

}

export default ValidateFire;