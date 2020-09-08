import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

import Transfer from '../api/Transfer'

//import datable
import { MDBDataTableV5, MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from 'mdbreact';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Load from '../extra/Load'

class TableSend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sends: [],
      loading: true,
      users: [],
      userSend: []
    }
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
  }

  getData() {

    axios.get('chain/list').then(response => {
      this.setState({ sends: response.data })
      //    console.log(this.state.sends)
      console.log('response :', response.data)
    }).catch(error => {
      alert("Error " + error)
    })

    axios.get('user/list')
    .then(response => {
      this.setState({users: response.data});
      console.log('users :', this.state.users)
    }).catch(error => {
      alert("Error " + error)
    })

  }


  componentDidMount() {

    this.getData()

    demoAsyncCall().then(() => this.setState({ loading: false }));

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
          action: <Transfer sendId={data.from} receiveId={this.state.userSend.id} transaction={data.transaction} getData={this.getData} />,

        }

      ))
    ]

    //filtrara solo los que tienen estado Enviado

    rows = rows.filter(e => e.state == "Recibido")


    const data = {
      columns,
      rows
    }



    //console.log('filter :',arrayFilter)

    console.log('data :', data)

    const onTagsChange = (event, values) => {
      this.setState({ userSend: values })
      console.log('userSend onChange',this.state.userSend)
    }

    const { loading } = this.state;

    if (loading) { // if your component doesn't have to wait for an async action, remove this block 
      return <Load />; // render null when app is not ready
    } else {
      return (
        <MDBRow>
          <MDBCol size="12">
            <Autocomplete
              id="userToSend"
              size="lg"
              options={this.state.users}
              getOptionLabel={option => (option.name)}
              onChange={onTagsChange}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Usuario a enviar" variant="outlined" />}
            />
          </MDBCol>
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

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

export default TableSend;

