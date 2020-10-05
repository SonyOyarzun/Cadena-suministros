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
/*
export const editUser = user => {
    return axios({
        method: 'put',
        url: '/user/edit/',
        data: {
            id:     user.id,
            name:   user.name,
            email:  user.email,
            role:   user.role,
            path:   user.path
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
*/
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

/**
 * 
 * @param {  const process = () => {

    axios({
        method: 'put',
        url: '/user/edit/',
        data: {
          id: props.id,
          name: document.getElementById('editUserForm.name').value,
          email: document.getElementById('editUserForm.email').value,
          role: document.getElementById('editUserForm.role').value,
          path: document.getElementById('editUserForm.path').value
        }
      })
        .then((response) => {
          console.log(response);
          props.getData()
          alert(response.data)
        }, (error) => {
          console.log(error);
        });
  
    }} user 
 */


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
