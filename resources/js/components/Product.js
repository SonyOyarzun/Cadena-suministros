import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import { Card } from 'react-bootstrap';

import Load from './extra/Load'
import TableProduct from './tables/TableProduct'
import { getProduct } from './tables/TableFunctions'



class Product extends Component {

  constructor(props) {
    super()
    this.state = {
      product: [],
      loading: true
    }
  }


  componentDidMount() {

    const params = {
      path: this.props.location.data
    }

    getProduct(params).then(response => {
      this.setState({ product: response, loading: false })
    })

  }

  render() {

    if (this.state.loading) {
      return (<Load/>)
    } else {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Lista de Productos</Card.Title>
              <Card.Text>
              </Card.Text>
              <TableProduct products={this.state.product}/>
            </Card.Body>
          </Card>
        </div>
      )
    }
  }
}

export default Product;

// <TableProduct product={this.state.product}/>