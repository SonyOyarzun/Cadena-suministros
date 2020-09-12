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

import { MDBDataTableV5,MDBDataTable, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBModalFooter, MDBIcon } from 'mdbreact';
import { Container } from '@material-ui/core';

import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

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

  let array = []


  useEffect(() => {

    process()
   

  }, []);


  function getSteps() {

    array = []

    Object.keys(step).map((key, row) => (

      array.push(step[row]['metadata']['info'])

    ))

    console.log('get array :', array)
  }

  const process = () => {

    const params = {
      "asset": '71b9e5c544cb3758ba607ba4f439c5097fde6895d097623ef665ac73f183102a',
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
      if(response.data.asset.data.transaction != null){
      setProducts(response.data.asset.data.transaction)
    }
    }).catch(error => {
      alert("Error " + error)
    })

    if(products!=null){
    html2canvas(document.getElementById('capture'))
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
   //   const pdfWidth = imgProps.width/3;
   //   const pdfHeight = imgProps.height/3;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    })
  }

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
    <div id="capture">
    <MDBRow>
      <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
        <MDBCard className={classes.root}>

          <MDBCardBody className={classes.root}>

          {array.length > 0 ? 
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
                      {(array.length - 1) == index ? (
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
            />
          </MDBCardFooter>

        </MDBCard>
      </MDBCol>
    </MDBRow>
    </div>
  );
}
