import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';


import TableMyProduct from './tables/TableMyProduct'
import { getMyProduct , productList} from './tables/TableFunctions'


import Load from './extra/Load'


class MyProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products:[]
    }

  }

  componentDidMount(){

    axios.all([
      getMyProduct(this.props.path),
      productList(),
    ])
      .then(responseArr => {

       console.log('getMyProduct',responseArr[0])

       console.log('productList',responseArr[1])

       this.setState({products : responseArr[0], loading: false })

      })

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
               <TableMyProduct products={this.state.products}/>
            </Card.Body>
          </Card>
          </div>
        )
    }
    }
}

export default MyProduct;

