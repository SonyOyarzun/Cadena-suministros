import React, { Component } from 'react'
import { reset } from './UserFunctions'

import {Card} from 'react-bootstrap';


const styles = {
    custom: {
        width: "300px",
     //   height: "70vh",
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
            loading: false,
            message:''
        }
        this.onSubmit = this.onSubmit.bind(this); 
        this.onChange = this.onChange.bind(this); 
    }

   
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword:this.state.confirmPassword,
            token:  this.state.token,
        }

        reset(user).then(res => {
           // this.props.history.push(`/`)
        })
    }

    render() {
        console.log('state :',this.state)
        return (
            <div style={styles.custom} className='responsive'>
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
                                    defaultValue={this.state.email}
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
                            >
                                Restablecer
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

