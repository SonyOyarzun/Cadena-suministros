import React, { Component } from 'react'
import { login } from './UserFunctions'

import { MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { NavLink, Link, withRouter } from 'react-router-dom';

const styles = {
    custom: {
        marginTop: "15px",
        marginBottom: "0px",
        marginRight: "0px",
        marginLeft: "0px",
        float: 'right',
        height: "30px",
    },
    button: {
        width: "100px",
        height: "45px",
        marginRight: "0px",
        marginLeft: "0px",
        marginTop: "10px",
    },
    ref: {
        width: "20px",
        height: "10px",
        marginRight: "0px",
        marginLeft: "0px",
        marginTop: "0px",
        marginBottom: "10px",
        float: 'left'
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
            //    this.props.history.push(`/`)
            }
        })
    }

    render() {
        return (
            <div className="mx-auto col-12">
            <form noValidate onSubmit={this.onSubmit} className="row">
                <div className='col-sm-5'>
                    <input
                        type="email"
                        className=""
                        name="email"
                        placeholder="Mail"
                        value={this.state.email}
                        onChange={this.onChange}
                        style={styles.custom}
                    />
                </div>
                <div className='row col-sm-5'>
                    <input
                        type="password"
                        className=""
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
                <div className='col-sm-2' >
                <MDBBtn type="submit" style={styles.button}>Ingresar</MDBBtn>
                </div>
            </form>
            </div>
        )
    }
}

export default Login
