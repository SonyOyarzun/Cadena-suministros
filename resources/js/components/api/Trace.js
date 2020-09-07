import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));




export default function VerticalLinearStepper() {

  const [step, setStep] = useState([]);

  function getSteps() {

    let array = []

    Object.keys(step).map((key, row) => (

      array.push(step[row]['metadata']['info'])

    ))

    let array2 = []
 
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    var fecha
    array.map((data, index) => (
      fecha = new Date(data.date),
      array2.push('De ' + data.from + ' para ' + data.to + ' en la fecha ' +  fecha.toLocaleDateString("es-ES", options))
    ))

    console.log('get steps :', array2)

    return array2;
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
  }


  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState();
  const steps = getSteps();

  return (
    <MDBCard className={classes.root}>
      <MDBCardBody className="mx-4">

        <MDBInput id="id" label="ID TRANSACCION" validate error="wrong" success="right" valueDefault="f0957665d0936c2942903d52f5e2854a5f71e892b8fcf222115c227ccc454f87" />
        <MDBBtn onClick={process}>BUSCAR</MDBBtn>
        <Stepper activeStep={activeStep}   orientation="vertihcal">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography></Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </MDBCardBody>
    </MDBCard>
  );
}