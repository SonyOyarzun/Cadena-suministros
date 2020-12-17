import React, { Component, ButtonGroup } from 'react';

import axios from 'axios'

import Transfer from '../api/Transfer'

//import datable
import { MDBDataTableV5, MDBBadge, MDBBtn, MDBIcon, MDBBtnGroup } from 'mdbreact';

import Load from '../extra/Load'

import { getChain } from "../tables/TableFunctions";
import { getProfile } from "../../access/UserFunctions";
import { ToggleButton } from 'react-bootstrap';
import { getWeekYearWithOptions } from 'date-fns/fp';

import Message from '../extra/Messaje';

class TableReceive extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sends: [],
      user: [],
      loading: true,
      switch: true,
      show: false,
      message: '',
    }
    this.getData = this.getData.bind(this); //permitira enviar elevento getData a componente 
    this.sendID = this.sendID.bind(this);
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
      this.setState({ user: response })
    })

  }

  handleSwitchChange = () => () => {

    this.setState({
      switch: !this.state.switch
    });
    console.log(this.state.switch)
  }

  sendID(id) {
    this.setState({ show: true, message: id })
  }

  options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  time

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
          transaction: <MDBBtn color="primary" rounded onClick={() =>{ this.sendID(data.transaction) }}>
            ID Transaccion
          </MDBBtn>,
          from: data.fromName,
          to: data.toName,
          state: data.state,
          updated_at: this.time = new Date(data.updated_at).toLocaleDateString("es-ES", this.options),
          action:
            <MDBBtnGroup className="mr-2">
              <Transfer state={'Recibido'} sendId={data.from} receiveId={data.to} transaction={data.transaction} getData={this.getData} switch={this.state.switch} />
              <Transfer state={'Rechazado'} sendId={data.from} receiveId={data.to} transaction={data.transaction} getData={this.getData} switch={this.state.switch} />
            </MDBBtnGroup>

        }

      ))
    ]

    //filtrara solo los que tienen estado Enviado

    //console.log('filter',this.state.user)

    rows = rows.filter(e => e.state == "Enviado" && e.to == this.state.user.name)


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
          <div className='custom-control custom-switch'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='customSwitchesChecked'
              defaultChecked
              checked={this.state.switch}
              onChange={this.handleSwitchChange()}
            />
            <label className='custom-control-label' htmlFor='customSwitchesChecked'>
              Habilitar Registro de Temperaturas
            </label>
          </div>
          <MDBDataTableV5
            className='cust-table'
            responsive
            bordered
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
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

          <Message handleShow={() => { this.setState({ show: true }) }} handleClose={() => { this.setState({ show: false }) }} show={this.state.show} title={'Transacción'} label={'ID'} value={this.state.message}></Message>
        </div>
      )
    }
  }

}

export default TableReceive;

