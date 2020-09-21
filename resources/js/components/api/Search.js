import React, { useState } from 'react';
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

import Message from '../extra/Messaje';

import { MDBDataTableV5, MDBDataTable, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBModalFooter, MDBIcon } from 'mdbreact';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));




export default function Search() {

  //Modals
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState('');

  const [prevent, setPrevent] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('Buscar');


  const [step, setStep] = useState([]);

  const [products, setProducts] = useState([]);

  let array = []

  const getSteps = (step) => {

    array = []

    Object.keys(step).map((key, row) => (
      
      {...step[row]['metadata'].hasOwnProperty('info') &&
      array.push(step[row]['metadata']['info'])
      }

    ))

    console.log('get array :', array)


  }

  const process = () => {

    if(document.getElementById('id').value.trim().length>0){
    setPrevent(true)
    setButtonMessage('Cargando...')

    const params = {
      "atribute": document.getElementById('id').value,
    }

    axios.get('/search', {
      params
    }).then(response => {
      console.log('productos :', response.data)
      if (response.data.length >0){
        setProducts(response.data)
        getSteps(response.data) 
      }

    }).catch(error => {
      console.log("Error " + error)
    })

    setTimeout(function() {
      setPrevent(false);
      setButtonMessage('Buscar');
    }, 5000);
  }else{
    alert('Debe ingresar un parametro')
  }

  }

  const handleClick = (id) => {

    handleShow()
    setMessage(id)

  }

  let columns = []
  let preRows = []
  let rows = []
  let data = []
  array = []
  let count = 0

  let obj = {}
  let objID = []


  const createJson = (
    //Busca propiedad transaction, la cual es caracteristica de nuestro diseño

    

    products.map((data, index) => (
  
      {
        ...data.data.hasOwnProperty('transaction') ? (

          obj = data.data.transaction,
          objID[index] = data.id
        ) : (
            console.log('no encontrada'),
            columns = [{label: "Busqueda", field: "message"}],
            rows = [{message: "Sin registros"}]
          )
      }
    )),


    Object.keys(obj).map((key, row) => (

      preRows = [objID[row]],
      preRows = { clickEvent: () => handleClick(objID[row]) },
      Object.keys(obj[key]).map((key2, col) => (
        {
          ...count < Object.keys(obj[key]).length &&
          columns.push({
            label: key2,
            field: key2,
          }),
        },
        preRows[key2] = obj[row][key2],
        count = count + 1
      )),
      rows.push(preRows)

    )),

    data = {
      columns,
      rows
    }

  );



  console.log('data  :', data)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  var time

  return (
    <MDBRow>
      <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
        <MDBCard className={classes.root}>

          <MDBCardHeader>
            <MDBInput id="id" label="Producto" validate error="wrong" success="right" valueDefault="" />
            <div className="text-center pt-3 mb-3">
  <MDBBtn type="button" onClick={process} disabled={prevent} gradient="blue" rounded className="btn-block z-depth-1a">{buttonMessage}</MDBBtn>
            </div>
          </MDBCardHeader>

          <MDBCardFooter className={classes.root}>

            {array.length > 0 ?
              (
                <div className="text-center">
                  <Typography style={{ textAlign: 'center' }} variant="h6" component="h1">
                    <MDBIcon icon="cash-register" /> Producto
              </Typography>
                </div>
              )
              : (<></>)
            }
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
          </MDBCardFooter>

        </MDBCard>
      </MDBCol>

      <Message handleShow={handleShow} handleClose={handleClose} show={show} title={'Transacción'} label={'ID'} value={message}></Message>

    </MDBRow>
  );
}
