import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

import Transfer from '../api/Transfer'

//import datable
import { MDBDataTableV5, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact';

import Load from '../extra/Load'

import { getChain } from "../tables/TableFunctions";
import { getProfile } from "../../access/UserFunctions";

class TableReceive extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sends: [],
      user: [],
      loading: true
    }
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
  }

  getData() {

    getChain().then(response => {
      this.setState({ sends: response, loading: false })
      console.log('response :', response)
    }).catch(error => {
      alert("Error " + error)
    })

  }


  componentDidMount() {

    this.getData()

    getProfile().then(response => {
      this.setState({ user: response})
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
      {
        label: 'Accion',
        field: 'action',
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
          action: <Transfer sendId={data.from} receiveId={data.to} transaction={data.transaction} getData={this.getData}/>,

        }

      ))
    ]

    //filtrara solo los que tienen estado Enviado

    //console.log('filter',this.state.user)

    rows = rows.filter(e => e.state == "Enviado" &&  e.to == this.state.user.name)


    const data = {
      columns,
      rows
    }

    

    //console.log('filter :',arrayFilter)

    //console.log('data :',data)

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
          />

        </div>
      )
    }
  }

}

export default TableReceive;

