import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

//import datable
import { MDBDataTableV5, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact';

import Load from '../extra/Load'


class TableSend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sends: [],
      loading: true
    }
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
  }

  getData(){

    axios.get('chain/list').then(response => {
      this.setState({ sends: response.data })
      this.setState({ loading: false })
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


  let columns = [
        {
          label: 'Transaccion',
          field: 'transaction',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'ID',
          },
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
      ]
      
  let rows = [
        ...this.state.sends.map((data, order) => (
            {
              transaction: data.transaction,
              from: data.fromName,
              to: data.toName,
              state: data.state,
              updated_at: data.updated_at,
                        
            }
          
        ))
      ]


        //filtrara solo los que tienen estado Enviado

    rows = rows.filter(e => e.state == "Enviado")
  
    const data = {
      columns,
      rows
    }

    console.log(data)
    const { loading } = this.state;
    
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return <Load/>; // render null when app is not ready
    }else{

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

}


export default TableSend;

