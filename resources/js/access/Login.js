import React, { Component } from 'react'
import { login } from './UserFunctions'

import { MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { NavLink, Link, withRouter } from 'react-router-dom';

const styles = {
    custom: {
        marginTop: "1.7vw",
        marginBottom: "0.2vh",
        marginRight: "0vw",
        marginLeft: "0vw"
    },
    button: {
        marginTop: "0.5vw",
        width: "15vh",
        height: "5vh",
        marginRight: "0vw",
        marginLeft: "0vw",
        marginTop: "1.5vw"
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
            <form noValidate onSubmit={this.onSubmit} className="row">
                <div className='col-sm-4'>
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
                <div className='row col-sm-4'>
                    <input
                        type="password"
                        className=""
                        name="password"
                        placeholder="Contraseña"
                        value={this.state.password}
                        onChange={this.onChange}
                        style={styles.custom}
                    />
                    <div className='col-sm-12'>
                    <Nav.Link><Link className='darkLight-text' to='/Forgot'>Recuperar contraseña</Link></Nav.Link>
                    </div>
                </div>
                <div className='col-sm-4'>
                <MDBBtn type="submit" style={styles.button}>Ingresar</MDBBtn>
                </div>
            </form>
        )
    }
}

export default Login
