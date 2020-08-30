import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

//import datable
import { MDBDataTableV5, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact';


class TableSend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sends: []
    }
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
  }

  getData(){

    axios.get('chain/list').then(response => {
      this.setState({ sends: response.data })
  //    console.log(this.state.sends)
      console.log('response :',response.data)
    }).catch(error => {
      alert("Error " + error)
    })

  }


  componentDidMount() {

    this.getData()

  }


  render() {

    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'ID',
          },
        },
        {
          label: 'Transaccion',
          field: 'transaction',
          width: 150,
        },
        {
          label: 'De',
          field: 'from',
          width: 200,
        },
        {
          label: 'Para',
          field: 'to',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Estado',
          field: 'state',
        }, 
        {
          label: 'Fecha',
          field: 'updated_at',
        },
      ],
      
      rows: [
        ...this.state.sends.map((data, order) => (
            {
              
              id: data.id,
              transaction: data.transaction,
              from: data.fromName,
              to: data.toName,
              state: data.state,
              updated_at: data.updated_at,
                        
            }
          
        ))
      ]
      
    };

    console.log(data)
    return (
      <div>
        <MDBDataTableV5
          className='cust-table'
          responsive
          bordered
          hover
          btn
          sortable={false}
          data={data}
        />

      </div>
    )
  }

}


export default TableSend;

