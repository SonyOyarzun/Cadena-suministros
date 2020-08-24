import React, { Component } from 'react';
import {NavLink,Link, withRouter}  from 'react-router-dom';
import axios from 'axios';

//import datable
import { MDBDataTableV5, MDBBadge } from 'mdbreact';

import CircularProgress from '@material-ui/core/CircularProgress';
// or
//import { CircularProgress } from '@material-ui/core';


class TableUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }

  }

  componentDidMount() {

    const { data } = this.props.location

    const params = {
      "path": data,
    }

    axios.get('json-api',{
      params
    })
    .then(response => {
      this.setState({ products: response.data})
      document.getElementById('stanby').innerHTML= <CircularProgress/>
    }).catch(error => {
      alert("Error " + error)
    })

  }



  render() {

    let columns = []
    let preRows = []
    let rows = []
    let count = 0

    Object.keys(this.state.products).map((key, row) => (
  
      preRows = [],
      Object.keys(this.state.products[key]).map((key2, col) => (
      {...count < Object.keys(this.state.products[key]).length &&
        columns.push({
          label: key2,
          field: key2,
        }),
      },
    //  console.log('contador :',count,' limite',Object.keys(this.state.products[key]).length,' col:',columns),
          preRows[key2]=this.state.products[row][key2],
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
          data={data}
        />

      </div>
    )
  }

}

export default withRouter(TableUser);
