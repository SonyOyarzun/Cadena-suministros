import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

//import datable
import { MDBDataTableV5, MDBBtn, MDBIcon,MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from 'mdbreact';


import Load from '../extra/Load'

import Pdf from '../extra/Pdf'

class TableOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sends: [],
      loading: true,
    }
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
  }

  getData() {

    axios.get('chain/list/').then(response => {
      this.setState({ sends: response.data })
      this.setState({ loading: false })
          console.log('sends :',this.state.sends)
      console.log('response :', response.data)
    }).catch(error => {
      alert("Error " + error)
    })

  }

  componentDidMount() {

    this.getData()

  }

  handleLink(path, data) {
    this.props.history.push({
      pathname: path,
      data: data // your data array of objects
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
          prevTransaction: data.prevTransaction,
          from: data.fromName,
          to: data.toName,
          state: data.state,
          updated_at: data.updated_at,
          action: <Pdf transaction={data.transaction}/>,
        }

      ))
    ]

    //filtrara solo los que tienen estado Enviado

    rows = rows.filter(e => e.transaction == e.prevTransaction)

    const data = {
      columns,
      rows
    }



    //console.log('filter :',arrayFilter)

    console.log('data :', data)
  

    const { loading } = this.state;

    if (loading) { // if your component doesn't have to wait for an async action, remove this block 
      return <Load />; // render null when app is not ready
    } else {
      return (
        <MDBRow>
          <MDBCol size="12">
            <MDBDataTableV5
              className='cust-table'
              responsive
              entriesOptions={[5, 10, 15]}
              entries={5}
              pagesAmount={4}
              bordered
              hover
              btn
              sortable={false}
              data={data}
            />
          </MDBCol>
        </MDBRow>
      )
    }
  }

}


export default TableOrder;

