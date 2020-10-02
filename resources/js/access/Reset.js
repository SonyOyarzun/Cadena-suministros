import React, { Component } from 'react'
import { reset } from './UserFunctions'

import {Card} from 'react-bootstrap';


const styles = {
    custom: {
        width: "400px",
        height: "70px",
    }
}

class Reset extends Component {
    constructor(props){
        super(props);
        this.state = {
        	token:  decodeURIComponent(props.match.params.token),
            email : decodeURIComponent(props.match.params.email),
            password: '',
            confirmPassword: '',
            message: 'Restablecer',
            loading: false,
        }
        this.onSubmit = this.onSubmit.bind(this); 
        this.onChange = this.onChange.bind(this); 
    }

   
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        this.setState({ loading: true })
        this.setState({ message: 'Cargando...' })

        const user = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword:this.state.confirmPassword,
            token:  this.state.token,
        }

        reset(user).then(res => {
            this.setState({ loading: false })
            this.setState({ message: 'Restablecer' })
        })
    }

    render() {
        console.log('state :',this.state)
        return (
            <div style={styles.custom} className="mx-auto mt-3">
            <Card>
            <Card.Body>
              <Card.Title>Restablecer Contraseña</Card.Title>
               <Card.Text>
               <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Mail</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="Mail"
                                    placeholder="Ingrese Mail"
                                    value={this.state.email}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Contraseña"
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    placeholder=" Confirmar contraseña"
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                                disabled={this.state.loading}
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

export default Reset

