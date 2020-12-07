import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

import { getChain } from './TableFunctions'

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
  }


  componentDidMount() {

    getChain().then(response => {
      this.setState({ sends: response })
      this.setState({ loading: false })
    })

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

    if (loading) { // if your component doesn't have to wait for an async action, remove this block 
      return <Load />; // render null when app is not ready
    } else {

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

            info={false}
            searchLabel='Buscar'
            infoLabel={['Mostrando', 'de', 'de', 'entradas']}
            paginationLabel={['Previous', 'Next']}
            entriesLabel='Cantidad Maxima'
            disableRetreatAfterSorting={true}
          />

        </div>
      )
    }
  }

}


export default TableSend;

