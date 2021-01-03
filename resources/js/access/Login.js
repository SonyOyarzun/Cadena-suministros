import React, { Component } from 'react'
import { login } from './UserFunctions'

import { MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { NavLink, Link, withRouter } from 'react-router-dom';

import SnackBar from '../components/extra/SnackBar'
import { render } from 'react-dom';

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
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {},
            alert: '',
            type: '',
            show: false,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        this.props.history.push(`/`)
        this.setState({ show: false })

        const user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        }
    

        

        login(user).then(response => {
            console.log('login:', response)
            if (response != true) {
             //   this.setState({ alert: response.message, type: response.type, show: true })
             alert(response.message)
            }else{
                this.setState({ show: false })
            }
        })

    }

    render() {
        return (
            <div className="mx-auto col-12">
             
                <form validate onSubmit={this.onSubmit} className="row">
                    <div className='col-sm-4'>
                        <input
                         id="email"
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Mail"
                     //       value={this.state.email}
                     //       onChange={this.onChange}
                            style={styles.custom}
                            required
                        />
                    </div>
                    <div className='col-sm-5'>
                        <input
                        id="password"
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Contraseña"
                        //    value={this.state.password}
                        //    onChange={this.onChange}
                            style={styles.custom}
                            required
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

export default withRouter(Login)
