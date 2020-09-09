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

import { MDBDataTableV5, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));




export default function VerticalLinearStepper() {

  const [step, setStep] = useState([]);
  
  const [products, setProducts] = useState([]);

  let array = []

  function getSteps() {

    array = []

    Object.keys(step).map((key, row) => (

      array.push(step[row]['metadata']['info'])

    ))

    console.log('get array :', array)
  }

  const process = () => {

    const params = {
      "asset": document.getElementById('id').value,
    }

    axios.get('/assets', {
      params
    }).then(response => {
      setStep(response.data)
      console.log('step :', step)

    }).catch(error => {
      alert("Error " + error)
    })

    axios.get('/transaction', {
      params
    }).then(response => {
      setProducts(response.data.asset.data.transaction)
    }).catch(error => {
      alert("Error " + error)
    })

  }


  
  let columns = []
  let preRows = []
  let rows = []
  let data = []
  array = []
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
  const steps = getSteps();

  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  var time


  return (
    <MDBCard className={classes.root}>
      <MDBCardBody className="mx-4">

        <MDBInput id="id" label="ID ASSETS" validate error="wrong" success="right" valueDefault="f201939a08fb850e995224054c78004302292bea5cacec253dbca6ef33d6357f" />
        <MDBBtn onClick={process}>BUSCAR</MDBBtn>

        <MDBDataTableV5
          className='cust-table'
          responsive
          bordered
          hover
          btn
          sortable={false}
          data={data}
        />

        <Timeline align="alternate">
          {array.map((label, index) => (
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
                  {(array.length-1) == index ? (
                    <i class="fas fa-check-circle"></i>
                  ) : (
                      <i class="fas fa-arrow-alt-circle-down"></i>
                    )}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography style={{ textAlign: 'center' }} variant="h6" component="h1">
                    <i className="fas fa-truck-moving"></i>
                  </Typography>
                  <Typography style={{ textAlign: 'center' }}>{label.from} <i class="fas fa-angle-double-right"></i> {label.to}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>

          ))}
        </Timeline>
      </MDBCardBody>
    </MDBCard>
  );
}
