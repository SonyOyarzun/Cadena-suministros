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

import { MDBDataTableV5,MDBDataTable, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBModalFooter, MDBIcon } from 'mdbreact';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));




export default function Trace() {

  const [step, setStep] = useState([]);

  const [products, setProducts] = useState([]);

  let arrayStep = []

  function getSteps() {

    arrayStep = []

    Object.keys(step).map((key, row) => (

      arrayStep.push(step[row]['metadata']['info'])

    ))

    console.log('get array :', arrayStep)
  }

  const process = () => {

    if(document.getElementById('id').value.trim().length>0){

    const params = {
      "asset": document.getElementById('id').value,
    }

    axios.all([
      axios.get('/assets', {params}),
      axios.get('/transaction', {params}),
    ])
    .then(responseArr => {
      //this will be executed only when all requests are complete
      let message = ''
      if(responseArr[0].hasOwnProperty('data')){
        if(responseArr[0].data.length>0){  
        setStep(responseArr[0].data)
        }else{
          message=message + 'Traza no encontrada \n' 
        }
      console.log('Traza: ', responseArr[0].data);
      }else{
        message=message + 'Traza no encontrada \n' 
      }
      if(responseArr[1].data.hasOwnProperty('asset')){
      setProducts(responseArr[1].data.asset.data.transaction)
      console.log('Productos: ', responseArr[1].data.asset.data.transaction);
      }else{
        message=message + 'Producto no encontrado \n' 
      }

     if(message.length>0){
       alert(message)
     }

    });

  }else{
    alert('Debe ingresar una ID')
  }

  }



  let columns = []
  let preRows = []
  let rows = []
  let data = []
  let array = []
  let count = 0

  const createJson = (

    Object.keys(products).map((key, row) => (

      preRows = [],

      Object.keys(products[key]).map((key2, col) => (
        {
          ...count < Object.keys(products[key]).length &&
          columns.push({
            label: key2,
            field: key2,
          }),
        },
        preRows[key2] = products[row][key2],
        count = count + 1
      )),
      rows.push(preRows)

    )),

    data = {
      columns,
      rows
    }

  );

  console.log(data)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  
  getSteps();

  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  var time

  
  return (
    <MDBRow>
      <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
        <MDBCard className={classes.root}>

          <MDBCardHeader>
            <MDBInput id="id" label="ID ASSETS" validate error="wrong" success="right" valueDefault="" />
            <div className="text-center pt-3 mb-3">
              <MDBBtn type="button" onClick={process} gradient="blue" rounded className="btn-block z-depth-1a">Buscar</MDBBtn>
            </div>
          </MDBCardHeader>

          <MDBCardBody className={classes.root}>

          {arrayStep.length > 0 ? 
(
            <div className="text-center">
              <Typography style={{ textAlign: 'center' }} variant="h6" component="h1">
                <i class="fas fa-map-marked-alt"></i> Recorrido
              </Typography>
            </div>
)
:(<></>)
}

            <Timeline align="alternate">
              {arrayStep.map((label, index) => (
                time = new Date(label.date),
                <TimelineItem>
                  <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                      {
                        time.toLocaleDateString("es-ES", options)
                      }
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot>
                      {(array.length - 1) == index ? (
                        <i class="fas fa-check-circle"></i>
                      ) : (
                          <i class="fas fa-arrow-alt-circle-down"></i>
                        )}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent >
                    <Paper elevation={3} className={'darkLight'}>
                      <Typography style={{ textAlign: 'center' }} variant="h6" component="h1">
                        <i className="fas fa-truck-moving"></i>
                      </Typography>
                      <Typography className='darkLight' style={{ textAlign: 'center' }}>{label.from} <i class="fas fa-angle-double-right"></i> {label.to}</Typography>
                      <Typography className='darkLight' style={{ textAlign: 'center' }}>{label.commentary}</Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>

              ))}
            </Timeline>

          </MDBCardBody>

          <MDBCardFooter className={classes.root}>

{array.length > 0 ? 
(
          <div className="text-center">
              <Typography style={{ textAlign: 'center' }} variant="h6" component="h1">
              <MDBIcon icon="cash-register" /> Producto
              </Typography>
            </div>
)
:(<></>)
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
    </MDBRow>
  );
}
