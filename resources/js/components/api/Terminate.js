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

import { getTransaction, getAsset, searchAsset, getConfig, getChain2, receiveChain, terminateChain } from "../tables/TableFunctions";

import {  getUser} from "../../access/UserFunctions";

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
  const [showSnack, setShowSnack] = useState(false);

  const [message, setMessage] = useState('');

  const [user, setUser] = useState([]);
  const [config, setConfig] = useState([]);
  const [chain, setChain] = useState([]);

  const [prevent, setPrevent] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('Buscar');
  const [buttonMessage2, setButtonMessage2] = useState('Dar de Baja');

 // const [alert, setAlert] = useState('');
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
      getChain2()
    ])
      .then(responseArr => {
        setUser(responseArr[0])
        setConfig(responseArr[1])
        setChain(responseArr[2])
            console.log('user',responseArr[0],'config ',responseArr[1],'chain ',responseArr[2])
      })

  }, []);

  const save = (id_transaction, newTransaction, asset, from) => {

    const data = {
      transaction: id_transaction,
      newTransaction: newTransaction,
      asset: asset,
      from: from,
      commentary: document.getElementById('commentary').value,
      state: 'Terminado',
    }

    terminateChain(data)
      .then((response) => {
        alert(response.message)
        setType(response.type)
      })
      .catch(response => {
        alert(response.message)
        setType(response.type)
      })

  }


  const terminate = () => {
    render(<Load />, document.getElementById('load'));
    setShowSnack(true)
    if (document.getElementById('commentary').value.trim().length > 0) {

      const BURN_ADDRESS = 'BurnBurnBurnBurnBurnBurnBurnBurnBurnBurnBurn'

      products.map((transaction, index) => {


        const params = {
          "asset": transaction.id,
        }
        console.log('params',params)

        getAsset(params).then(responseAsset => {
          console.log('getAsset',responseAsset)
          console.log('getAssetFinal',responseAsset[responseAsset.length-1])
          console.log('chainFinal',chain)
          //inicio asset
          console.log('transaction',transaction.id)
          const tx = chain.filter((e) => e.transaction == responseAsset[responseAsset.length-1].id)

         //inicio user
         console.log('user tx',tx)

         if(tx.length==0){
          alert('No se puede dar de baja un producto seleccionado')
          render(<></>, document.getElementById('load'));
         }else{

         

         let userTo = {
          id: tx[0].to
        }

         if(tx[0].state == 'Reenviado'){
          userTo = {
            id: tx[0].from
          }
 
         }
 
         
         
         console.log('get user userTo',userTo) 

         getUser(userTo).then(response => {
          console.log('get user keys',response) 
         // const us = user.filter((e) => e.id == tx[0].to)
          const us = response
          console.log('tx', tx)
          console.log('user', us)



          const metadata = {
            from: us.name,
            to: 'FIN',
            commentary: document.getElementById('commentary').value,
            state: 'Terminado',
            date: new Date().toString()
          }

          console.log('metadata', metadata)

          const keys = {
            receivePublickey: BURN_ADDRESS,
            sendPrivateKey: us.privateKey,
          }


          console.log('responseAsset[0]', responseAsset)

          transfer(responseAsset[responseAsset.length-1], metadata, keys, config).then(response2 => {
            console.log('terminate', response2)
            save(response2.id, response2.asset.id, transaction.id, us.id)
            alert('Producto(s) de baja')
        //    setType('success')

          }).catch(response => {
            console.log('error terminate', response)
          //  setAlert('No se puede dar de baja un producto seleccionado')
          //  setType('error')
          alert('No se puede dar de baja un producto seleccionado')
          }).finally(() => {
            render(<></>, document.getElementById('load'));
            setShowSnack(false)
          })


        //fin user
  
        })
      }


          //fin asset

        })

      })

    } else {
      setShowSnack(true)
      alert('Debe ingresar Observacion')
      setType('error')
      render(<></>, document.getElementById('load'));
    }

  }

  const process = () => {

    render(<Load />, document.getElementById('load'));
    setPrevent(true)
    setButtonMessage('Cargando...')
    setShowSnack(false)

    const params = {
      "attribute": document.getElementById('id').value,
    }

    searchAsset(params).then(response => {
      console.log('productos :', response)
      if (response.type != 'error') {
        setProducts(response)
        setShowSnack(false)
      } else {
        alert(response.message)
        setType(response.type)
        setShowSnack(true)
      }

    }).catch(response => {
      alert(response.message)
      setType(response.type)
      console.log("Error " + response)
    }).finally(() => {
      setPrevent(false);
      setShowSnack(false)
      setButtonMessage('Buscar');
      render(<></>, document.getElementById('load'));
    })


  }

  const handleClick = (id) => {
    setShowSnack(false)
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
            console.log('no encontrada')
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

                    searchLabel='Buscar'
                    infoLabel={['Mostrando', 'de', 'de', 'entradas']}
                    paginationLabel={['Previous', 'Next']}
                    entriesLabel='Cantidad Maxima'
                    disableRetreatAfterSorting={true}
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
