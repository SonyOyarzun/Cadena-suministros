import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { MDBDataTableV5, MDBDataTable, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBModalFooter, MDBIcon } from 'mdbreact';
import { Container } from '@material-ui/core';

import { getTransaction, getAsset, searchAsset, getConfig, getUser, getChain, receiveChain } from "../tables/TableFunctions";

import { transfer } from '../api/CRAB'

import Load from '../extra/Load'

import SnackBar from '../extra/SnackBar'
import { render } from 'react-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));




export default function Terminate(props) {

  //Modals
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState('');

  const [user, setUser] = useState([]);
  const [config, setConfig] = useState([]);
  const [chain, setChain] = useState([]);

  const [prevent, setPrevent] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('Buscar');
  const [buttonMessage2, setButtonMessage2] = useState('Dar de Baja');

  const [alert, setAlert] = useState('');
  const [type, setType] = useState('');

  const [step, setStep] = useState([]);

  const [products, setProducts] = useState([]);

  let array = []


  const getSteps = (step) => {

    Object.keys(step).map((key, row) => (

      console.log('key ', step[row]['data']['data']),

      {
        ...step[row]['data'].hasOwnProperty('data') &&
        array.push(step[row]['data']['data'])
      }

    ))

    console.log('get array :', array)

  }

  useEffect(() => {

    axios.all([
      getUser(),
      getConfig(),
      getChain()
    ])
      .then(responseArr => {
        setUser(responseArr[0])
        setConfig(responseArr[1])
        setChain(responseArr[2])
        //    console.log('user',responseArr[0],'config ',responseArr[1])
      })

  }, []);

  const save = (id_transaction, newTransaction, asset, from) => {

    const data = {
      transaction: id_transaction,
      newTransaction: newTransaction,
      asset: asset,
      from: from,
      commentary: document.getElementById('commentary').value,
      state: props.state,
    }

    receiveChain(data)
      .then((response) => {
        console.log('receiveChain :', response)
        setAlert(response.message)
        setType(response.type)
        props.getData()
      })
      .catch(response => {
        console.log('error receiveChain', response)
        setAlert(response.message)
        setType(response.type)
      })

  }


  const terminate = () => {

    if (document.getElementById('commentary').value.trim().length > 0) {

      const BURN_ADDRESS = 'BurnBurnBurnBurnBurnBurnBurnBurnBurnBurnBurn'

      products.map((transaction, index) => {


        const params = {
          "asset": transaction.id,
        }

        getAsset(params).then(response => {

          console.log(transaction)
          const tx = chain.filter((e) => e.transaction == transaction.id)
          const us = user.filter((e) => e.id == tx[0].to)
          console.log('tx', tx)
          console.log('user', us)



          const metadata = {
            from: us[0].name,
            to: 'FIN',
            commentary: document.getElementById('commentary').value,
            state: 'Terminado',
            date: new Date().toString()
          }

          console.log('metadata', metadata)

          const keys = {
            receivePublickey: BURN_ADDRESS,
            sendPrivateKey: us[0].privateKey,
          }

          console.log('keys', keys)

          console.log('response', response[0])

          transfer(response[0], metadata, keys, config).then(response2 => {
            console.log('terminate', response2)
            save(response2[0].id, response2.id, transaction.id, us[0].id)

          }).catch(response => {
            console.log('error terminate', response)
            setAlert(response.message)
            setType(response.type)
          })

        })

      })

    } else {
      setAlert('Debe ingresar Observacion')
      setType('error')
    }

  }

  const process = () => {

    render(<Load />, document.getElementById('load'));
    setPrevent(true)
    setButtonMessage('Cargando...')


    const params = {
      "attribute": document.getElementById('id').value,
    }

    searchAsset(params).then(response => {
      console.log('productos :', response)
      if (response.type != 'error') {
        setProducts(response)
      } else {
        setAlert(response.message)
        setType(response.type)
      }

    }).catch(response => {
      setAlert(response.message)
      setType(response.type)
      console.log("Error " + response)
    }).finally(() => {
      setPrevent(false);
      setButtonMessage('Buscar');
      render(<></>, document.getElementById('load'));
    })


  }

  const handleClick = (id) => {

    handleShow()
    setMessage(id)

  }

  let columns = []
  let preRows = []
  let rows = []
  let data = []

  let count = 0

  let obj = {}
  let objID = []


  const createJson = (
    //Busca propiedad transaction, la cual es caracteristica de nuestro diseño



    products.map((data, index) => (

      {
        ...data.data.hasOwnProperty('data') ? (

          obj[index] = data.data.data,
          objID[index] = data.id


        ) : (
            console.log('no encontrada'),
            columns = [{ label: "Busqueda", field: "message" }],
            rows = [{ message: "Sin registros" }]
          )
      }
    )),

    // console.log('obj :',obj),

    Object.keys(obj).map((key, row) => (

      preRows = [objID[row]],
      preRows = { clickEvent: () => handleClick(objID[row]), cursor: 'pointer' },

      Object.keys(obj[key][0]).map((key2, col) => (

        //   console.log('table :',key2),

        {
          ...count < Object.keys(obj[key][0]).length &&
          columns.push({
            label: key2,
            field: key2,
          }),
        },


        preRows[key2] = obj[row][0][key2],
        count = count + 1
      )),

      rows.push(preRows)

    )),

    data = {
      columns,
      rows
    }

  );


  console.log('arrayf  :', array)
  console.log('data  :', data)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  var time

  return (
    <MDBRow>
      <MDBCol md="12" lg="12" xl="12" className="mx-auto mt-3">
        {alert != '' &&
          <SnackBar alert={alert} type={type} />
        }
        <MDBCard className={classes.root}>

          <MDBCardHeader>Busqueda de Productos</MDBCardHeader>

          <MDBCardBody>

            <MDBInput id="id" label="Producto" validate error="wrong" success="right" valueDefault="" />
            <div className="text-center pt-3 mb-3">
              <MDBBtn type="button" onClick={process} disabled={prevent} gradient="blue" rounded className="btn-block z-depth-1a">
                {buttonMessage}
              </MDBBtn>
            </div>

            {products.length > 0 ?
              (
                <div className="text-center">
                  <Typography style={{ textAlign: 'center' }} variant="h6" component="h1">
                    <MDBIcon icon="cash-register" /> Producto
              </Typography>

                  <MDBDataTableV5
                    responsive
                    bordered
                    hover
                    btn
                    sortable={false}
                    paging={false}
                    searching={false}
                    data={data}
                    info={false}
                  />

                </div>
              )
              : (<center>{'Sin resultados'}</center>)
            }


          </MDBCardBody>

          <MDBCardFooter className={classes.root}>

            {products.length > 0 ? (<>
              <MDBInput id="commentary" label="Observacion" validate error="wrong" success="right" valueDefault="" />
              <div className="text-center pt-3 mb-3">
                <MDBBtn type="button" onClick={terminate} disabled={prevent} gradient="blue" rounded className="btn-block z-depth-1a">
                  {buttonMessage2}
                </MDBBtn>
              </div>
            </>
            )
              :
              (<></>)
            }
          </MDBCardFooter>

        </MDBCard>
      </MDBCol>

    </MDBRow>
  );
}
