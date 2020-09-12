import React, { useEffect, useState } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import { propTypes } from 'react-bootstrap/esm/Image';


// define a generatePDF function that accepts a tickets argument
const generatePDF = getdata => {

  let columns = []
  let preRows = []
  let rows = []
  let data = []
  let array = []
  let count = 0

  // initialize jsPDF
  const doc = new jsPDF();

  Object.keys(getdata).map((key, row) => (

    preRows = [],

    Object.keys(getdata[key]).map((key2, col) => (
      columns[col] = key2,
      preRows[col] = getdata[row][key2],
      count = count + 1
    )),
    rows.push(preRows)
  )),

  console.log(columns, rows)


   //titulo
   doc.text("Registro de Trazabilidad de un Producto", 40, 15);
  // startY is basically margin-top

  //coordenadas x y de ubicacion de texto
  doc.text("Producto", 14, 30);
  doc.autoTable(columns, rows, { startY: 35 });

  doc.text("Recorrido", 14, 60);

  doc.autoTable(columns, rows, { startY: 65 });

  getSteps();


  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // guardar pdf
  doc.save(`report_${dateStr}.pdf`);
};

export default function Pdf(props) {

  const [step, setStep] = useState([]);

  const [products, setProducts] = useState([]);

  let arrayStep = []

  function getSteps() {

    arrayStep = []

    Object.keys(step).map((key, row) => (

    arrayStep.push(step[row]['metadata']['info'])

    ))

  }

  useEffect(() => {

    const params = {
      "asset": props.transaction,
    }

    console.log('id :', props.transaction)

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
      console.log('response pdf :', response.data.asset.data.transaction)
      //   if(response.data.asset.data.transaction != undefined){
      setProducts(response.data.asset.data.transaction)
      console.log('products :', products)
      //  }
    }).catch(error => {
      alert("Error " + error)
    })

  }, []);



  return (
    <MDBBtn tag="a" size="sm" gradient="blue" onClick={() => generatePDF(products)}>
      <MDBIcon far icon="file-pdf" />
    </MDBBtn>
  )

}

