import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { MDBDataTableV5, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


export default function WithMultipleCheckboxes() {

  const [products, setProducts] = useState([]);
  const [checkbox1, setCheckbox1] = React.useState('');
  let columns = []
  let preRows = []
  let rows = []
  let data = []
  let count = 0

 
////////////////////////////////////////////////////////////////////



useEffect(() => {

    axios.get('json-api/my')
      .then(response => {
        setProducts(response.data);
     //   console.log(response.data)
      }).catch(error => {
        alert("Error " + error)
      })
  
      createJson
  
  }, []);

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
      //  console.log('contador :',count,' limite',Object.keys(this.state.products[key]).length,' col:',columns),
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


const handleClick = (e) => {
    //  setDatatable({columns,rows})
    setDatatable(data)

    console.log('data :',data)
    console.log('datatable',datatable)
  
    }

    const [datatable, setDatatable] = React.useState({
        columns: columns,
        rows: [
          {
            date: "2016-01-01", 
            title: "Año Nuevo",
            extra: "Civil e Irrenunciable"
          }
     
        ],
      });
    
      console.log('datatable',datatable)
////////////////////////////////////////////////////////////////////

  const showLogs2 = (e) => {
    setCheckbox1(e);
  };

  return (
    <>
    <button onClick={handleClick}>Text</button>
    <MDBTable btn fixed>
      <MDBTableHead columns={data.columns} />
      <MDBTableBody rows={data.rows} />
    </MDBTable>

    </>
  );
}