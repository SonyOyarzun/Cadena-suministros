import React, { Component } from 'react'
import { login } from './UserFunctions'

import { MDBIcon, MDBBtn,MDBInput } from "mdbreact";

const styles = {
    custom: {
      paddingTop:"1vw",
      paddingBottom: "1vh",
      paddingRight: "1vw",
      paddingLeft: "1vw"
    },
    button: {
        width: "1vh",
        height: "1vh",
        paddingRight: "1vw",
        paddingLeft: "1vw",
        paddingTop:"1vw"
      }
  }

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
                                    style={styles.custom}
                                />

                                <input
                                    type="password"
                                    className=""
                                    name="password"
                                    placeholder="Contraseña"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    style={styles.custom}
                                />


                            <label>  
                            <MDBBtn
                                type="submit"
                                style={styles.button}
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
