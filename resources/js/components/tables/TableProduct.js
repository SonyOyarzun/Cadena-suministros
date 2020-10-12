import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import axios from 'axios';

//import datable
import { MDBDataTableV5, MDBBadge } from 'mdbreact';

import { getProduct } from '../tables/TableFunctions'


class TableProduct extends Component {

  constructor(props) {
    super();

  }



  render() {

    console.log('TableProduct',this.props.products)
    

    let columns = []
    let preRows = []
    let rows = []
    let count = 0

    Object.keys(this.props.products).map((key, row) => (

      preRows = [],
      Object.keys(this.props.products[key]).map((key2, col) => (
        {
          ...count < Object.keys(this.props.products[key]).length &&
          columns.push({
            label: key2,
            field: key2,
          }),
        },
        //  console.log('contador :',count,' limite',Object.keys(this.state.products[key]).length,' col:',columns),
        preRows[key2] = this.props.products[row][key2],
        count = count + 1
      )),
      rows.push(preRows)

    ))



    let data = {
      columns,
      rows
    };


      return (
        <div>
          <div id="stanby"></div>

          <MDBDataTableV5
            className='cust-table'
            responsive
            bordered
            hover
            btn
            entriesOptions={[5, 10, 15]}
            entries={5}
            data={data}
          />

        </div>
      )
    
  }

}


export default withRouter(TableProduct);
