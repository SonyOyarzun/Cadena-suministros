import axios from 'axios'


export const newUser = user => {
    return axios
        .post('/user/new/', user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
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
                .catch(err => {
                    console.log(err)
                    return []
                })
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

export const login = user => {
    return axios
        .post(
            '/user/login', user,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)

            if (response.data != true) {
                return response.data
            } else {
                location.reload()
                return response.data
            }

        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const forgot = user => {
    return axios
        .post(
            '/reset_password_without_token', user,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data

        })
        .catch(err => {
            console.log(err)
            return []
        })
}

export const reset = user => {
    return axios
        .post(
            '/reset_password_with_token', user,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data

        })
        .catch(err => {
            console.log(err.data)
            return []
        })
}

export const getProfile = () => {
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
            return []
        })
}

export const getUser = (user) => {
    return axios
        .post('/user/search', user, {
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
