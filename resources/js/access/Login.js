import React, { Component } from 'react'
import { login } from './UserFunctions'

import { MDBIcon, MDBBtn } from "mdbreact";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                this.props.history.push(`/profile`)
            }
        })
    }

    render() {
        return (
                <div className="row">
                
                        <form noValidate onSubmit={this.onSubmit}>
                                <input
                                    type="email"
                                    className=""
                                    name="email"
                                    placeholder="Mail"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />

                                <input
                                    type="password"
                                    className=""
                                    name="password"
                                    placeholder="Contraseña"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            <label>  
                            <MDBBtn
                                type="submit"
                                className="btn btn-primary"
                                style={{width:'50px',height:'30px'}}
                            >
                               <MDBIcon icon="plus" />
                            </MDBBtn>
                            </label>  
                        </form>

                    </div>
        )
    }
}

export default Login
