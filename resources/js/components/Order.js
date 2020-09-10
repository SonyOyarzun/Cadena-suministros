import React, { Component, Fragment } from 'react';

import {Card} from 'react-bootstrap';

import TableOrder from './tables/TableOrder'



class Product extends Component {

    render() {
        return (
            <Fragment>
            <Card>
            <Card.Body>
              <Card.Title>Lista de Assets</Card.Title>
               <Card.Text>
               </Card.Text>
               <TableOrder/>
            </Card.Body>
          </Card>
          </Fragment>
        )
    }
}

export default Product;