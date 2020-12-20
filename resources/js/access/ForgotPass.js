import React, { Component } from 'react'
import { forgot } from './UserFunctions'

import { Card } from 'react-bootstrap';

import { MDBIcon, MDBBtn, MDBInput } from "mdbreact";

import SnackBar from '../components/extra/SnackBar'
import { render } from 'react-dom';


const styles = {
    custom: {
        width: "400px",
        height: "70px",
    }
}

class ForgotPass extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            password: '',
            email:'',
            loading: false,
            show: false,
            message: 'Solicitar',
            errors: {},
            alert: '',
            type: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        this.setState({ loading: true, message: 'Cargando...', show: false })

        const user = {
            email: document.getElementById('email2').value,
        }

        console.log('forgot user:', user)

        forgot(user).then(response => {
            this.setState({ loading: false, message: 'Solicitar', alert: response.message, type: response.type, show: true })
            console.log('forgot: ', response)
        })

    }

    render() {
        return (
            <div style={styles.custom} className="mx-auto mt-3">
                {this.state.show!=false &&
                    <SnackBar show={this.state.show} alert={this.state.alert} type={this.state.type} />
                }
                <Card>
                    <Card.Body>
                        <Card.Title>Recuperar contraseña</Card.Title>
                        <Card.Text>

                            <form validate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Mail</label>
                                    <input
                                        id='email2'
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Ingrese Mail"
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>


                                <MDBBtn className={'btn-block'} type="submit" style={styles.button} disabled={this.state.loading}>{this.state.message}</MDBBtn>
                            </form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default ForgotPass

