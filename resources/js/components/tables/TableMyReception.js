import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

import Transfer from '../api/Transfer'

import Auto from '../extra/AutoComplete'

//import datable
import { MDBDataTableV5, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from 'mdbreact';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Load from '../extra/Load'

import { getChain, reSendChain } from "../tables/TableFunctions";

class TableMyReception extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sends: [],
      loading: true,
      users: [],
      userSend: []
    }
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
    this.onTagsChange = this.onTagsChange.bind(this);
  }

  getData() {

    getChain().then(response => {
      this.setState({ sends: response, loading: false })
      console.log('response :', response)
    })

  }

  onTagsChange(event, values) {
    this.setState({ userSend: values })
  //  console.log('userSend onChange', this.state.userSend)
  }


  componentDidMount() {
    this.getData()
  }


  render() {

    const save = (id_transaction, asset, to) => {

      const data = {
        transaction: id_transaction,
        asset: asset,
        to: to,
      }

      reSendChain(data).then((response) => {
          console.log(response);
          this.getData()
        }, (error) => {
          console.log(error);
        });
    }

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
          action: <MDBBtn color="primary" rounded onClick={() => { save(data.transaction, data.prevTransaction, this.state.userSend.id) }}><MDBIcon icon="user-plus" /></MDBBtn>,

        }

      ))
    ]

    //filtrara solo los que tienen estado Enviado

   // rows = rows.filter(e => e.state == "Recibido" && e.to == this.state.userSend.id)

   rows = rows.filter(e => e.state == "Recibido")

    const data = {
      columns,
      rows
    }



    //console.log('filter :',arrayFilter)

    console.log('data :', data)

    const styles = {
      border: {
        height: '100px',
        paddingTop: "1vh",
        paddingBottom: "1vh",
      }
    }


    const { loading } = this.state;

    if (loading) { // if your component doesn't have to wait for an async action, remove this block 
      return <Load />; // render null when app is not ready
    } else {
      return (
        <>
        <MDBRow fluid style={styles.border}>
          <MDBCol size="4">
            <Auto onTagsChange={this.onTagsChange} />
          </MDBCol>
        </MDBRow>

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

        </>
      )
    }
  }

}


export default TableMyReception;

