import axios from 'axios'

export const register = newUser => {
    return axios
        .post('api/register', newUser, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const login = user => {
    return axios
        .post(
            '/user/login',
            {
                email: user.email,
                password: user.password
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            console.log('login',response.data)
            location.reload()
        })
        .catch(err => {
            console.log(err)
        })
}

export const forgot = user => {
    return axios
        .post(
            '/password/email/',
            {
                email: user.email,
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            console.log('login',response.data)
            location.reload()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProfile = () => {
    return axios
        .get('api/profile', {
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
