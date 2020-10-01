import React, { Component } from 'react'
import { register } from './UserFunctions'

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
        	token: decodeURIComponent(props.match.params.token),
            email : decodeURIComponent(props.match.params.email),
            password: '',
            password_confirmation: '',
        }
    }

   
    onSubmit(e){
        e.preventDefault();
        const url = BASE_URL+'/api/password/reset' ;
        const {token, email, password, password_confirmation} = this.state ;
        axios.post(url, {
	    	token,
	        email,
	        password,
	        password_confirmation
          })
          .then(response=> {
            this.setState({err: false});
            this.props.history.push('login') ;
          })
          .catch(error=> {
          	this.refs.password.value="";
            this.refs.email.value="";
            this.refs.confirm.value="";
            this.setState({err: true});
          });
     }

    onChange(e){
     	const {name, value} = e.target;
        this.setState({[name]: value});
     }


    render() {
        console.log('state :',this.state)
        return (
            <div style={styles.custom} className='responsive'>
            <Card>
            <Card.Body>
              <Card.Title>Reestablecer Contraseña</Card.Title>
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
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={this.state.password}
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
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Reestablecer
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

