import React,{useState} from 'react';
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

      Object.keys(step[key]).map((key2, col) => (
      array.push(col)
      ))

    ))
  
    console.log('get steps :',array)
  
    return array;
  }

  const process = () => {

      const params = {
        "asset": document.getElementById('id').value,
      }
  
      axios.get('/assets', {
        params
      }).then(response => {
        setStep(response.data)
        console.log('step :',step)
       
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

        <MDBInput id="id" label="ID TRANSACCION" validate error="wrong" success="right" valueDefault="1221dd799971c886bed23dec3055e632ded4463152c96979abc04e7f3b7722a8"/>
        <MDBBtn onClick={process}>BUSCAR</MDBBtn>
        <Stepper activeStep={activeStep} orientation="vertical">
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