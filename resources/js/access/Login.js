import React, { Component } from 'react'
import { login } from './UserFunctions'

import { MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { NavLink, Link, withRouter } from 'react-router-dom';

const styles = {
    custom: {
        marginLeft: "5px",
        marginRight: "0px",
        marginTop: "15px",
        marginBottom: "0px",
        height: "30px",
        width: "100%",
    },
    button: {
        marginLeft: "0px",
        marginRight: "0px",
        marginTop: "10px",
        marginBottom: "0px",
        width: "100%",
        height: "45px",
    },
    ref: {
        marginRight: "0px",
        marginLeft: "0px",
        marginTop: "0px",
        marginBottom: "10px",
        width: "100%",
        height: "10px",
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
                this.props.history.push(`/`)
            }
        })
    }

    render() {
        return (
            <div className="mx-auto col-12">
            <form noValidate onSubmit={this.onSubmit} className="row">
                <div className='col-sm-4'>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Mail"
                        value={this.state.email}
                        onChange={this.onChange}
                        style={styles.custom}
                    />
                </div>
                <div className='col-sm-5'>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Contraseña"
                        value={this.state.password}
                        onChange={this.onChange}
                        style={styles.custom}
                    />
                    <div className='col-sm-12' style={styles.ref}>
                    <Link className='darkLight-text' to='/Forgot'>Recuperar contraseña</Link>
                    </div>
                </div>
                <div className='col-sm-3' >
                <MDBBtn type="submit" style={styles.button}>Ingresar</MDBBtn>
                </div>
            </form>
            </div>
        )
    }
}

export default Login
