import React, { useEffect, useState } from 'react';

//import QRcodeReact, { qrcode } from 'qr-code-react';
import QRcodeReact, { qrcode } from 'qr-code-react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

//generar pdf
import jsPDF from "jspdf";
import "jspdf-autotable";

//formato fecha
import { format } from "date-fns";
import { string } from 'prop-types';


export default function Pdf(props) {

  const [step, setStep] = useState([]);

  const [products, setProducts] = useState([]);

  let arrayStep = []

  function getSteps() {

    arrayStep = []

    Object.keys(step).map((key, row) => (

      arrayStep.push(step[row]['metadata']['info'])

    ))

    console.log('arrayStep :', arrayStep)
  }

  
  useEffect(() => {

    const params = {
      "asset": props.transaction,
    }

    console.log('id :', props.transaction)

        axios.all([
          axios.get('/assets', { params }),
          axios.get('/transaction', { params }),
        ])
          .then(responseArr => {
  
            
            if (responseArr[0].data.length>0) {
  
              console.log('eval: ', responseArr[0].data[0].hasOwnProperty('metadata'));
              console.log('eval 2: ', responseArr[0].data);
  
              if (responseArr[0].data[0].hasOwnProperty('metadata')) {
  
              if (responseArr[0].data[0].metadata.hasOwnProperty('info')) {
                setStep(responseArr[0].data)
              } else {
                setStep([])
              }
  
              if (responseArr[1].data.asset.data.hasOwnProperty('transaction')) {
                setProducts(responseArr[1].data.asset.data.transaction)
              } else {
                setProducts([])
              }
    
            }else{
              console.log('No se encuentra ID')
            }
          }else{
            console.log('No se encuentra ID')
          }
          });
  

  }, []);
  
/*
  useEffect(() => {
    async function List() {
      try {
        setLoading("true");
        const response = await axios.all([
          axios.get('/assets', { params }),
          axios.get('/transaction', { params }),
        ])

        const json = await response.json();
        // console.log(json);
        setResult(
          json.data.asset.data.transaction.map(data => {
            console.log(data.asset.data.transaction);
            return data.asset.data.transaction;
          })
        );
      } catch (error) {
        setLoading("null");
      }
    }

    if (searchBook !== "") {
      fetchBookList();
    }
  }, [searchBook]);

  return [result, loading];
}
*/


  const generatePDF = getdata => {

    let columns = []
    let preRows = []
    let rows = []
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


    //ubicacion elementos
    let imgLogo = 10
    let textTitulo = imgLogo + 30
    let titleProd = textTitulo + 15
    let tableProd = titleProd + 10
    let titleTrace = tableProd + 25
    let tableTrace = titleTrace + 10
    let ID = imgLogo + 250
    let QR = ID + 10



    let logo = new Image();

    logo.src = '/img/logo.png';

    // x y width height
    doc.addImage(logo, 'JPEG', 14, imgLogo , 35, 20);

    //titulo
    doc.text("Registro de Trazabilidad de un Producto", 55, textTitulo);
    // startY is basically margin-top

    //coordenadas x y de ubicacion de texto
    doc.text("Producto", 14, titleProd);
    doc.autoTable(columns, rows, { startY: tableProd });

    doc.text("Recorrido", 14, titleTrace);

    //pie de firmas
    doc.text("Valide esta transaccion escaneando el codigo QR", 14, ID);

    //crear qr
    let qr = qrcode(9, 'M');
    var URLdomain = window.location.host;
    qr.addData(URLdomain+'/Trace/'+props.transaction);
    //qr.addData('false');
    qr.make();


    //cerar etiqueta y extraer el src
    let dataUrl = qr.createImg(4).src;

    console.log('dataUrl :',dataUrl)

    doc.addImage(dataUrl, 'JPEG', 12, QR, 15, 15);



    const tableColumn = ["De", "Para", "Comentario", "Fecha"];
    // define an empty array of rows
    const tableRows = [];
    // for each ticket pass all its data into an array

    getSteps()

    console.log('v ', arrayStep)

    arrayStep.forEach(arrayStep => {
      const traceData = [
        arrayStep.from,
        arrayStep.to,
        arrayStep.commentary,
        // called date-fns to format the date on the ticket
        format(new Date(arrayStep.date), "dd-MM-yyyy")
      ];
      // push each tickcet's info into a row
      tableRows.push(traceData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: tableTrace });


    const date = Date().split(" ");

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // guardar pdf
    doc.save(`report_${dateStr}.pdf`);
  };

  return (
    <MDBBtn tag="a" size="sm" gradient="blue" onClick={() => generatePDF(products)}>
      <MDBIcon far icon="file-pdf" />
    </MDBBtn>
  )

}

//https://github.com/davidshimjs/qrcodejs/issues/78