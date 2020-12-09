import React, { useEffect, useState } from 'react';

//import QRcodeReact, { qrcode } from 'qr-code-react';
import QRcodeReact, { qrcode } from 'qr-code-react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

//generar pdf
import jsPDF from "jspdf";
import "jspdf-autotable";

//functions
import { newMeter, resetMeter, meterTx, getMeter } from '../extra/ExtraFunctions';
import { getTransaction, getAsset, getConfig } from "../tables/TableFunctions";
import Load from '../extra/Load'
import { render } from 'react-dom';
import SnackBar from '../extra/SnackBar'

//formato fecha
//import { format } from "date-fns";
import { string } from 'prop-types';


export default function Pdf(props) {

  const [step, setStep] = useState([]);
  const [products, setProducts] = useState([]);

  const [prevent, setPrevent] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('Buscar');

  const [alert, setAlert] = useState('');
  const [type, setType] = useState('');


  let arrayStep = []

  function getSteps(step) {

    arrayStep = []

    Object.keys(step).map((key, row) => (

      arrayStep.push(step[row]['metadata']['metadata'])

    ))

    console.log('arrayStep :', arrayStep)
  }


  //useEffect(() => {

  const getData = () => {

    render(<Load />, document.getElementById('load'));

    const params = {
      "asset": props.transaction,
    }

    console.log('id :', props.transaction)


    axios.all([
      getAsset(params),
      getTransaction(params),
      getConfig(params),
    ])
      .then(responseArr => {
        console.log('get', responseArr)
        console.log('getAsset', responseArr[0])
        console.log('getTransaction', responseArr[1])

        if (responseArr[0].length > 0) {
          console.log('length', responseArr[0])
          if (responseArr[0][0].metadata.hasOwnProperty('metadata')) {

            console.log('metadata', responseArr[0])
            if (responseArr[0][0].metadata.hasOwnProperty('metadata')) {

              console.log('metadata', responseArr[0])

              getSteps(responseArr[0])


            } else {
              setAlert('No encontrada')
            }

          } else {
            setAlert('No encontrada')
          }

        } else {
          setAlert('No encontrada')
        }

        if (responseArr[1].hasOwnProperty('asset')) {

          if (responseArr[1].asset.data.hasOwnProperty('data')) {

            setProducts(responseArr[1].asset.data.data)
            generatePDF(responseArr[1].asset.data.data, responseArr[2])

          } else {
            setAlert('No encontrada')
          }
        } else {
          setAlert('No encontrada')
        }

        console.log('step: ', responseArr[0]);
        console.log('Productos: ', responseArr[1].asset.data.data);


      }).finally(() => {
        setPrevent(false);
        setButtonMessage('Buscar');
        render(<></>, document.getElementById('load'));
      })


  }
  //}, []);




  const generatePDF = (getdata, config) => {

    let columns = []
    let preRows = []
    let rows = []
    let count = 0

    // initialize jsPDF
    const doc = new jsPDF("p", "mm", "a4");

    const centeredText = (text, y) => {
      var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(textOffset, y, text);
    }

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

    //fuentes
    doc.setFont('Roboto');
    //doc.setFontType('normal');
    //doc.setFontSize(28);

    // contador de paginas
    let pagination = 1

    //ubicacion elementos
    let maxWidth = doc.internal.pageSize.width
    let maxHeight = doc.internal.pageSize.height
    let scale = doc.internal.pageSize.scaleFactor
    let margin = 14
    let centerWidth = (maxWidth / 3)
    let centerHeight = (maxHeight / 2)

    let customWidthR = maxWidth - margin + 1
    let customWidthL = margin - 1
    let marginBottom = margin * 1.3

    let sizeQR = 30

    let imgLogo = 10
    let textTitulo = imgLogo + 55
    let titleProd = textTitulo + 20
    let tableProd = titleProd + 5
    let titleTrace = tableProd + 40
    let tableTrace = titleTrace + 5
    let ID = imgLogo + 35
    let QR = imgLogo
    let Foot = imgLogo + 40



    let logo = new Image();
    let mark = new Image();
    //logo.src = "/storage/images/" + config.logotype;
    logo.src = "/img/logo.png";
    mark.src = "/img/icon-logo-bw.png";


    //PAGINA
    const page = (page) => {

      doc.addImage(logo, 'PNG', margin, imgLogo, 45, 30);
      doc.addImage(mark, 'PNG', centerWidth, centerHeight + 40, 75, 75);

      //titulo
      doc.setFontSize(20);
      centeredText("Registro de Trazabilidad de un Producto", textTitulo)

      doc.line(customWidthR, textTitulo - imgLogo, customWidthL, textTitulo - imgLogo) // linea cabecera superior
      doc.line(customWidthR, textTitulo + imgLogo, customWidthL, textTitulo + imgLogo) // linea cabecera inferior

      doc.line(customWidthR, maxHeight - marginBottom, customWidthL, maxHeight - marginBottom) // linea footer inferior

      doc.line(customWidthL, maxHeight - marginBottom, customWidthL, textTitulo - imgLogo) // linea margen izquierdo
      doc.line(customWidthR, maxHeight - marginBottom, customWidthR, textTitulo - imgLogo) // linea margen derecho

      //pie de firmas
      doc.setFontSize(9);
      doc.text("Tx:" + props.transaction, customWidthR - 102, ID);
      doc.text("Valide esta transacción escaneando el codigo QR", customWidthR - 63, Foot);

      //doc.text("Pagina:" + page , customWidthR - margin, ID);
      //crear qr
      let qr = qrcode(9, 'M');
      var URLdomain = window.location.host;
      qr.addData(URLdomain + '/Trace/' + props.transaction);
      //qr.addData('false');
      qr.make();


      //cerar etiqueta y extraer el src
      let dataUrl = qr.createImg(4).src;

      console.log('dataUrl :', dataUrl)

      doc.addImage(dataUrl, 'JPEG', maxWidth - margin - sizeQR + 3, QR, sizeQR, sizeQR);

    }




    page(pagination)


    //texto de primera pagina
    doc.setFontSize(20);
    centeredText("Producto", titleProd)
    doc.autoTable(columns, rows, { startY: tableProd });

    centeredText("Recorrido", titleTrace)







    const tableColumn = ["De", "Para", "Comentario", "Estado", "Fecha"];
    // define an empty array of rows
    const tableRows = [];
    // for each ticket pass all its data into an array

    //getSteps()

    console.log('arrayStep ', arrayStep)

    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let time
    let rowsAutotable = 0

    // for(let i=0;i<=30;i++){

    arrayStep.forEach(arrayStep => {
      const traceData = [
        arrayStep.from,
        arrayStep.to,
        arrayStep.commentary,
        arrayStep.state,
        time = new Date(arrayStep.date).toLocaleDateString("es-ES", options)
        // called date-fns to format the date on the ticket
        //  format(new Date(arrayStep.date), "dd-MM-yyyy")
      ];
      // push each tickcet's info into a row
      //   rowsAutotable = rowsAutotable + 1
      tableRows.push(traceData);
    });

    //}

    console.log('tableRows ', tableRows)
    doc.autoTable(tableColumn, tableRows, { startY: tableTrace });

    /*
    if (rowsAutotable > 1) {
      pagination = pagination + 1
      doc.addPage()
      page(pagination)
    }
*/

    //const date = Date().split(" ");

    options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    time
    time = new Date().toLocaleDateString("es-ES",options)
   // const date = Date().split(" ")
    //const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    const dateStr = time 
    // guardar pdf
    doc.save(`reporte ${dateStr}.pdf`);
    // doc.output();
  };

  return (
    <>
      {alert != '' &&
        <SnackBar alert={alert} type={type} />
      }
      <MDBBtn tag="a" size="sm" gradient="blue" onClick={() => getData()}>
        <MDBIcon far icon="file-pdf" />
      </MDBBtn>
    </>
  )

}

//https://github.com/davidshimjs/qrcodejs/issues/78