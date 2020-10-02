import React, { Component } from 'react'
import { forgot } from './UserFunctions'

import {Card} from 'react-bootstrap';


const styles = {
    custom: {
        width: "300px",
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
            email: this.state.email
        }

        forgot(user).then(res => {
            this.props.history.push(`/`)
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
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Solicitar
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

