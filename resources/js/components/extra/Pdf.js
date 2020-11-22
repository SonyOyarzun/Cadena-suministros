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
    const doc = new jsPDF("p","mm","a4");

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
    doc.setFont('RopaSans-Regular');
    //doc.setFontType('normal');
    //doc.setFontSize(28);

    //ubicacion elementos
    let maxWidth = doc.internal.pageSize.width
    let maxHeight = doc.internal.pageSize.height
    let margin = 14
    
    let imgLogo = 10
    let textTitulo = imgLogo + 50
    let titleProd = textTitulo + 15
    let tableProd = titleProd + 10
    let titleTrace = tableProd + 25
    let tableTrace = titleTrace + 10
    let ID = imgLogo + 250
    let QR = ID + 10


    let logo = new Image();
    //logo.src = "/storage/images/" + config.logotype;
    logo.src = "/img/logo.png";

    console.log('internal ',maxWidth,maxHeight)

    // x y width height
    doc.addImage(logo, 'PNG', margin, imgLogo, 45, 30);

    doc.line(maxWidth-margin,textTitulo-imgLogo, margin,textTitulo-imgLogo) // linea cabecera superior
    doc.line(maxWidth-margin,textTitulo+imgLogo, margin,textTitulo+imgLogo) // linea cabecera inferior

    doc.line(maxWidth-margin,maxHeight-(margin*2), margin,maxHeight-(margin*2)) // linea footer inferior

    doc.line(margin,maxHeight-(margin*2),margin,textTitulo-imgLogo) // linea margen izquierdo
    doc.line(maxWidth-margin,maxHeight-(margin*2),maxWidth-margin,textTitulo-imgLogo) // linea margen derecho

    //titulo
    doc.text("Registro de Trazabilidad de un Producto", 55, textTitulo);
    // startY is basically margin-top

    //coordenadas x y de ubicacion de texto
    doc.text("Producto", margin, titleProd);
    doc.autoTable(columns, rows, { startY: tableProd, startX: margin+1 });

    doc.text("Recorrido", margin, titleTrace);

    //pie de firmas
    doc.text("Valide esta transaccion escaneando el codigo QR", margin, ID);

    //crear qr
    let qr = qrcode(9, 'M');
    var URLdomain = window.location.host;
    qr.addData(URLdomain + '/Trace/' + props.transaction);
    //qr.addData('false');
    qr.make();


    //cerar etiqueta y extraer el src
    let dataUrl = qr.createImg(4).src;

    console.log('dataUrl :', dataUrl)

    doc.addImage(dataUrl, 'JPEG', margin, QR, 15, 15);



    const tableColumn = ["De", "Para", "Comentario", "Estado", "Fecha"];
    // define an empty array of rows
    const tableRows = [];
    // for each ticket pass all its data into an array

    //getSteps()

    console.log('arrayStep ', arrayStep)

    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    var time

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
      tableRows.push(traceData);
    });
    console.log('tableRows ', tableRows)
    doc.autoTable(tableColumn, tableRows, { startY: tableTrace ,startX: margin+1});


    //const date = Date().split(" ");
    const date = Date().split(" ")

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // guardar pdf
    doc.save(`reporte_${dateStr}.pdf`);
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