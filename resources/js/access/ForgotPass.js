import React, { Component } from 'react'
import { forgot } from './UserFunctions'

import {Card} from 'react-bootstrap';


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
            email: '',
            password: '',
            loading: false,
            message: 'Solicitar',
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

        this.setState({ loading: true })
        this.setState({ message: 'Cargando...' })

        const user = {
            email: this.state.email
        }

        forgot(user).then(res => {
          this.setState({ loading: false })
          this.setState({ message: 'Solicitar' })
        })
    }

    render() {
        return (
            <div style={styles.custom} className="mx-auto mt-3">
            <Card>
            <Card.Body>
              <Card.Title>Recuperar contraseña</Card.Title>
               <Card.Text>
               <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Mail</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Ingrese Mail"
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </div>   
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block" disabled={this.state.loading}
                            >
                                {this.state.message}
                            </button>
                        </form>
               </Card.Text>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default ForgotPass

