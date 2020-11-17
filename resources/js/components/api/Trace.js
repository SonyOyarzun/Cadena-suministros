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

import { MDBDataTableV5, MDBDataTable, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBModalFooter, MDBIcon } from 'mdbreact';
import { Container } from '@material-ui/core';


//parametros desde url
import { useParams, withRouter } from "react-router-dom";

import { getTransaction, getAsset } from "../tables/TableFunctions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));




function Trace(props) {

  const [step, setStep] = useState([]);

  const [products, setProducts] = useState([]);

  const [revert, setRevert] = useState(false);

  const [prevent, setPrevent] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('Buscar');

  const { asset } = useParams();
  //const { asset } = props


  let arrayStep = []

  function getSteps() {

    arrayStep = []

    Object.keys(step).map((key, row) => (

      arrayStep.push(step[row]['metadata']['metadata'])

    ))

    console.log('get array :', arrayStep)

  }

  const process = () => {

    if (document.getElementById('id').value.trim().length > 0) {

      setPrevent(true)
      setButtonMessage('Cargando...')

      const params = {
        "asset": document.getElementById('id').value,
      }

      axios.all([
        getAsset(params),
        getTransaction(params),
      ])
        .then(responseArr => {
          console.log('getAsset', responseArr[0])
          console.log('getTransaction', responseArr[1])

          if (responseArr[0].length > 0) {
            console.log('length', responseArr[0])
            if (responseArr[0][0].metadata.hasOwnProperty('metadata')) {

              console.log('metadata', responseArr[0])
              if (responseArr[0][0].metadata.hasOwnProperty('metadata')) {

                console.log('metadata', responseArr[0])
                if(revert==true){
                  responseArr[0].sort((a, b) => b.metadata.metadata.date - a.metadata.metadata.date)
                }else{
                  setStep(responseArr[0])
                }
                

              } else {
                alert('No encontrada')
              }

            } else {
              alert('No encontrada')
            }

          } else {
            alert('No encontrada')
          }


          if (responseArr[1].asset.data.hasOwnProperty('data')) {

            setProducts(responseArr[1].asset.data.data)

          } else {
            alert('No encontrada')
         }


          setPrevent(false);
          setButtonMessage('Buscar');

          console.log('Traza: ', responseArr[0]);
          console.log('Productos: ', responseArr[1]);

        });

    } else {
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

  console.log('data :', data)
  console.log('asset :', asset)


  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  getSteps();

  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  var time


  return (
    <MDBRow>
      <MDBCol md="12" lg="12" xl="12" >
        <MDBCard className={classes.root}>

          <MDBCardHeader>
            <MDBInput id="id" label="ID ASSETS" validate error="wrong" success="right" valueDefault={asset} />
            <div className="text-center pt-3 mb-3">
              <MDBBtn type="button" onClick={process} disabled={prevent} gradient="blue" rounded className="btn-block z-depth-1a">{buttonMessage}</MDBBtn>
            </div>
          </MDBCardHeader>

          <MDBCardBody className={classes.root}>

            {arrayStep.length > 0 ?
              (
                <div className="text-center">
                   <MDBInput id="order" label="Invertir Orden" validate error="wrong" success="right" valueDefault={asset} />
                   <MDBBtn type="button" onClick={revert} disabled={prevent} gradient="blue" rounded className="btn-block z-depth-1a">{'Invertir'}</MDBBtn>
                  <Typography style={{ textAlign: 'center' }} variant="h6" component="h1">
                    <i class="fas fa-map-marked-alt"></i> Recorrido
              </Typography>
                </div>
              )
              : (<></>)
            }

            <Timeline align="left">
              {arrayStep.map((label, index) => (
                time = new Date(label.date),
                <TimelineItem>
                  <TimelineOppositeContent>
                    <Typography style={{ textAlign: 'left' }} variant="body2" color="textSecondary">
                      {
                        time.toLocaleDateString("es-ES", options)
                      }
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot>
                      {(arrayStep.length)-1 == index  ? (
                        <i class="fas fa-check-circle"></i>
                      ) : (
                          <i class="fas fa-arrow-alt-circle-down"></i>
                        )}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent >
                    <Paper style={{ textAlign: 'right' }} elevation={3}>
                      <Typography style={{ textAlign: 'center' }} variant="h6" component="h1">
                        <i className="fas fa-truck-moving"></i>
                      </Typography>
                      <Typography style={{ textAlign: 'center' }}>{label.from} <i class="fas fa-angle-double-right"></i> {label.to}</Typography>
                      <Typography  style={{ textAlign: 'center' }}>{label.commentary}</Typography>
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
    </MDBRow>
  );
}

export default withRouter(Trace)



//varJson.reverse() invertir registros