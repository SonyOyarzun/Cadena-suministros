import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';

import TableProduct from './tables/TableProduct'
import {getProduct} from './tables/TableFunctions'



class Product extends Component {

  constructor(props) {
    super()
    this.state = {
        product: [],
        loading: false,
        message: 'Crear usuario'
    }
}

  componentDidMount(){

    const { data } = this.props.location

    console.log('p path',data)

    getProduct(data).then(response => {
      console.log('p response',response)
      this.setState({ product: response ,  message: 'Crear usuario' , loading: false })
    })

  }

    render() {
        return (
            <div>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Productos</Card.Title>
               <Card.Text>
               </Card.Text>
               <TableProduct product={this.state.product}/>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Product;