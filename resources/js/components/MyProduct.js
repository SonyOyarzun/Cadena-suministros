import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {Card} from 'react-bootstrap';


import TableMyProduct from './tables/TableMyProduct'


class Product extends Component {

    render() {
        return (
            <div>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Productos</Card.Title>
               <Card.Text>
               </Card.Text>
               <TableMyProduct/>
            </Card.Body>
          </Card>
          </div>
        )
    }
}

export default Product;