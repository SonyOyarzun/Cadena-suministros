import axios from 'axios'


export const newMeter = user => {
    return axios
        .post('/meter/new/', user, {
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


export const getMeter = () => {
    return axios
        .get('/meter/list/', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
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

