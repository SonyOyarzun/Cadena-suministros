import React, { Component } from 'react'
import { login } from './UserFunctions'

import { MDBIcon, MDBBtn,MDBInput } from "mdbreact";

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
                                    style={{margin:'10px'}}
                                />

                                <input
                                    type="password"
                                    className=""
                                    name="password"
                                    placeholder="Contraseña"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    style={{margin:'10px'}}
                                />


                            <label>  
                            <MDBBtn
                                type="submit"
                                style={{width:'100px',height:'40px',margin:'10px'}}
                            >
                            Ingresar
                            </MDBBtn>
                            </label>  

                        </form>

                    </div>
        )
    }
}

export default Login
