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




export default function Search() {

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
      "atribute": document.getElementById('id').value,
    }

    axios.get('/search', {
      params
    }).then(response => {
      setProducts(response.data)
      console.log('productos :', response.data)

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

  let obj = {}

  const createJson = (

    /*
    Object.keys(products).map((key, row) => (

      preRows = [],
      console.log('key :',key,'products[key]',products[key]),
      Object.keys(products[key]).map((key2, col) => (
        {
          ...count < Object.keys(products[key]).length &&
          columns.push({
            label: key2,
            field: key2,
          }),
        },
        preRows[key2] = products[row][key2],
        count = count + 1,
        console.log('key2 :',key2,'products[key2]',products[key2])
      )),
      rows.push(preRows)

    )),

    */



   products.map((data, index) => (

    console.log('data id:',data.id),

    {...data.data.hasOwnProperty('transaction') ? (
    
    obj=data.data.transaction

    ):(
    console.log('no encontrada')
    )
    }
   )),

   Object.keys(obj).map((key, row) => (

    preRows = [],
    console.log('key :',key,'products[key]',obj[key]),
    Object.keys(obj[key]).map((key2, col) => (
      {
        ...count < Object.keys(obj[key]).length &&
        columns.push({
          label: key2,
          field: key2,
        }),
      },
      preRows[key2] = obj[row][key2],
      count = count + 1,
      console.log('key2 :',key2,'products[key2]',obj[key2])
    )),
    rows.push(preRows)

  )),

  
   //obj = obj.filter(e => e.state == "Enviado"),



    data = {
      columns,
      rows
    }

  );

  console.log('data f ',data)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  var time

  return (
    <MDBRow>
      <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
        <MDBCard className={classes.root}>

          <MDBCardHeader>
            <MDBInput id="id" label="PRODUCTO3" validate error="wrong" success="right" valueDefault="2016-01-01" />
            <div className="text-center pt-3 mb-3">
              <MDBBtn type="button" onClick={process} gradient="blue" rounded className="btn-block z-depth-1a">Buscar</MDBBtn>
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
           //   data={data}
            />
          </MDBCardFooter>

        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
