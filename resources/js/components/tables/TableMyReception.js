import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

import Transfer from '../api/Transfer'

import Auto from '../extra/AutoComplete'

//import datable
import { MDBDataTableV5, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from 'mdbreact';

import { getChain, reSendChain } from "../tables/TableFunctions";

import Load from '../extra/Load'

import SnackBar from '../extra/SnackBar'
import { render } from 'react-dom';

class TableMyReception extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sends: [],
      loading: true,
      users: [],
      userSend: [],
      alert: '',
      type: ''
    }
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente hijo
    this.onTagsChange = this.onTagsChange.bind(this);
  }

  options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  time

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
      render(<></>, document.getElementById('message'));
      render(<Load />, document.getElementById('load'));
      const data = {
        transaction: id_transaction,
        asset: asset,
        to: to,
      }

      reSendChain(data).then((response) => {
        console.log(response);
        this.setState({ alert: response.message, type: response.type })

        setTimeout(() => {
          render(<></>, document.getElementById('load'));
          this.getData()
        }, 5000);


      }, (response) => {
        console.log(response);
        this.setState({ alert: response.message, type: response.type })
        render(<></>, document.getElementById('load'));
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
          updated_at: this.time = new Date(data.updated_at).toLocaleDateString("es-ES", this.options),
          action:
            <MDBBtn color="primary" rounded onClick={() => { save(data.transaction, data.asset, this.state.userSend.id) }}>
              <MDBIcon far icon="share-square" />
            </MDBBtn>,

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
          {this.state.alert != '' &&
            <SnackBar alert={this.state.alert} type={this.state.type} />
          }
          <MDBRow fluid style={styles.border}>
            <MDBCol size="4">
              <Auto onTagsChange={this.onTagsChange} label={'Usuario a Enviar'} />
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

                info={false}
                searchLabel= 'Buscar'
                infoLabel= {['Mostrando', 'de', 'de', 'entradas']}
                paginationLabel= {['Previous', 'Next']}
                entriesLabel= 'Cantidad Maxima'
                disableRetreatAfterSorting={true}
              />
            </MDBCol>
          </MDBRow>

        </>
      )
    }
  }

}


export default TableMyReception;

