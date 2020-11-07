import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import { Card } from 'react-bootstrap';


import TableMyProduct from './tables/TableMyProduct'
import { getMyProduct, productList } from './tables/TableFunctions'


import Load from './extra/Load'


class MyProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: []
    }

    this.updateData = this.updateData.bind(this);
  }


  updateData() {

    axios.all([
      getMyProduct(this.props.path),
      productList(),
    ])
      .then(responseArr => {

        let array = []

        array = responseArr[0]


        responseArr[1].map((data, index) => (

          array = array.filter(e => JSON.stringify(e) != data.json)


        ))

        this.setState({ products: array, loading: false })

      })

  }


  componentDidMount() {

     this.updateData()

  }


  render() {
    //console.log('products',this.state.products)

    if (this.state.loading) { // if your component doesn't have to wait for an async action, remove this block 
      return <Load />; // render null when app is not ready
    } else {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Lista de Productos</Card.Title>
              <Card.Text>
              </Card.Text>
              <TableMyProduct products={this.state.products} updateData={this.updateData} />
            </Card.Body>
          </Card>
        </div>
      )
    }
  }
}

export default MyProduct;

