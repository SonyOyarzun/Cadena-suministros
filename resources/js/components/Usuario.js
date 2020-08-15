import React, { Component, useState, useRef,useEffect} from 'react';
import ReactDOM from 'react-dom'

import { Button, Card,Table,Row, Col} from 'react-bootstrap';
import axios from 'axios'

class Usuario extends Component {

    constructor(props){
      super(props);
      this.state = {
        usuarios:[]
      }
    }

    componentDidMount(){

      axios.get('usuario').then(response=>{
        console.log(response.data[0])  
        this.setState({usuarios:response.data})
      }).catch(error=>{
        alert("Error "+error)
      })

    }

    render() {
        return (
          <div className="container">
            <br/>
            <h3>Laravel y React APIRest</h3>
            <hr/>

            <table className="table table-bordered order-table ">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nombre</th>
                  <th>Mail</th>
                </tr>
              </thead>
              <tbody id="bodytable">
                  {this.renderList()}
              </tbody>
            </table>

          </div>
        );
    }

    renderList(){

      return this.state.usuarios.map(data =>{

        return(
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
          </tr>
        )

      })

    }
}

if (document.getElementById('usuario')) {
    ReactDOM.render(<Producto />, document.getElementById('usuario'));
}

export default Usuario;