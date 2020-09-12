import React, { PureComponent } from 'react';

//Material Bootstrap
import { MDBIcon, MDBBtn } from "mdbreact";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";


// define a generatePDF function that accepts a tickets argument
const generatePDF = tickets => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Title", "Issue", "Status", "Closed on"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
    const ticketData = [
      'ticket.id',
      'ticket.title',
      'ticket.request',
      'ticket.status',
      // called date-fns to format the date on the ticket
      format(new Date(), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Closed tickets within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default function Pdf() {


    return (
      <MDBBtn tag="a" size="sm" gradient="blue" onClick={()=>generatePDF([])}>
        <MDBIcon far icon="file-pdf" />
      </MDBBtn>
    )
  
}

