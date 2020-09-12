import React, { Component, ButtonGroup , useEffect } from 'react';
import { jsPDF } from "jspdf";
//import datable
import { MDBDataTableV5, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from 'mdbreact';


import html2canvas from 'html2canvas';



const Pdf = () => {

  useEffect(() => {

    html2canvas(document.getElementById('capture'))
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
      });
      const imgProps = pdf.getImageProperties(imgData);
    //  const pdfWidth = pdf.internal.pageSize.getWidth();
    //  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pdfWidth = imgProps.width/3;
      const pdfHeight = imgProps.height/3;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    })

    
  }, []);


  
  return (
    <>
      <div id="capture">
       <TracePdf/>
      </div>
    </>
  )
}

export default Pdf;