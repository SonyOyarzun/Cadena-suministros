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