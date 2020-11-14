import React, { useState , useEffect } from 'react';
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

import { getTransaction, getAsset, searchAsset , getConfig } from "../tables/TableFunctions";
import { burn } from "../api/CRAB";

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
  const [config, setConfig] = useState([]);

  const [prevent, setPrevent] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('Buscar');
  const [buttonMessage2, setButtonMessage2] = useState('Dar de Baja');


  const [step, setStep] = useState([]);

  const [products, setProducts] = useState([]);

  let array = []


  const getSteps = (step) => {

    Object.keys(step).map((key, row) => (

      console.log('key ',step[row]['data']['data']),

      {...step[row]['data'].hasOwnProperty('data') &&
      array.push(step[row]['data']['data'])
      }

    ))

    console.log('get array :', array)

  }

  useEffect( () =>{
 
  getConfig().then(response => {

    setConfig(response)

  })

  }, [] );

  const terminate = () => {

    burn(products,config).then(response => {
    console.log('terminate',response)
    })

  }

  const process = () => {

    render(<Load/>, document.getElementById('load'));
    render(<></>, document.getElementById('message'));
    setPrevent(true)
    setButtonMessage('Cargando...')


    const params = {
      "attribute": document.getElementById('id').value,
    }

    searchAsset(params).then(response => {
      console.log('productos :', response)
      if (response.type != 'error'){
        setProducts(response) 
      }else{
      render(<SnackBar state={true} alert={response.message} type={response.type} />, document.getElementById('message'));
      }

    }).catch(response => {
      render(<SnackBar state={true} alert={response.message} type={response.type} />, document.getElementById('message'));
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

          obj[index]= data.data.data,
          objID[index] = data.id


        ) : (
            console.log('no encontrada'),
            columns = [{label: "Busqueda", field: "message"}],
            rows = [{message: "Sin registros"}]
          )
      }
    )),

   // console.log('obj :',obj),

    Object.keys(obj).map((key, row) => (
      
      Object.keys(obj[key][0]).map((key2, col) => (

     //   console.log('table :',key2),
        
        {...count < Object.keys(obj[key][0]).length &&
          columns.push({
            label: key2,
            field: key2,
          }),
        },
        count = count + 1
      )),
      console.log('p ',obj[row][0]),
      
      preRows = obj[row][0],
      rows.push(preRows),

      console.log('pre ',rows)

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
                </div>
              )
              : (<center>{'Sin resultados'}</center>)
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

          </MDBCardBody>

          <MDBCardFooter className={classes.root}>

          {products.length > 0 ? (<>
          <MDBInput id="id" label="Observacion" validate error="wrong" success="right" valueDefault="" />
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
