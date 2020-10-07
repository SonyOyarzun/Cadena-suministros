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
        })
        .catch(err => {
            console.log(err)
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
            alert(response.data)
        })
        .catch(err => {
            console.log(err)
        })
}

export const changePass = user => {
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
            //     console.log('login',response.data)

            if (response.data != true) {
                alert(response.data)
            } else {
                location.reload()
            }

        })
        .catch(err => {
            console.log(err)
        })
}

export const forgot = user => {
    return axios
        .post(
            '/reset_password_without_token',
            {
                email: user.email,
            },
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
    return axios
        .post(
            '/reset_password_with_token',
            {
                email: user.email,
                token: user.token,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword

            },
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
