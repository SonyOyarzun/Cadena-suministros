import React, { Component } from 'react'
import { reset } from './UserFunctions'

import { Card } from 'react-bootstrap';

import { MDBIcon, MDBBtn, MDBInput } from "mdbreact";

import SnackBar from '../components/extra/SnackBar'

const styles = {
    custom: {
        width: "400px",
        height: "70px",
    }
}

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: decodeURIComponent(props.match.params.token),
            email: decodeURIComponent(props.match.params.email),
            password: '',
            confirmPassword: '',
            message: 'Restablecer',
            loading: false,
            alert: '',
            type: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        this.setState({ loading: true , message: 'Cargando...'})

        const user = {
            email: document.getElementById('email2').value,
            password: document.getElementById('password2').value,
            confirmPassword: document.getElementById('confirmPassword2').value,
            token: this.state.token,
        }

        reset(user).then(response => {
            this.setState({ loading: false, message: 'Restablecer', type: response.type, alert: response.message })
            alert(response.message)
            console.log('state :', response)
        })
    }

    render() {
        
        return (
            <div style={styles.custom} className="mx-auto mt-3">
                <Card>
                    <Card.Body>
                        <Card.Title>Restablecer Contraseña</Card.Title>
                        <Card.Text>
                            <form Validate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email2">Mail</label>
                                    <input
                                    id='email2'
                                        type="email"
                                        className="form-control"
                                        name="Mail"
                                        placeholder="Ingrese Mail"
                                        value={this.state.email}
                                   //     onBlur={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2">Contraseña</label>
                                    <input
                                    id='password2'
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Contraseña"
                                  //      onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword2">Confirmar Contraseña</label>
                                    <input
                                    id='confirmPassword2'
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        placeholder=" Confirmar contraseña"
                                  //      onChange={this.onChange}
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

export default Reset

