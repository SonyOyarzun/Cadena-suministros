import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Result from '../Result';

import { map } from 'jquery';

export default function WithMultipleCheckboxes() {

  const [products, setProducts] = useState([]);
  const [datatable, setDatatable] = React.useState({})
  const [checkbox1, setCheckbox1] = useState([]);
  let columns = []
  let preRows = []
  let rows = []
  let data = []
  let count = 0

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

  ))

  /*
  data = {
    columns,
    rows
  }
*/
  

);



setDatatable({
  columns,
  rows
})



  //console.log('data', data)

  


  
  //setDatatable([...datatable,JSON.stringify(columns)])
  
  
  



  console.log('datatable', datatable)



  const showLogs2 = (e) => {
    setCheckbox1(e);
  };



  return (
    <>
      <MDBDataTableV5
        className='cust-table'
        responsive
        bordered
        hover
        btn
        entriesOptions={[5, 10, 15]}
        entries={5}
        data={datatable}
      />



    </>
  );
}

/**
 * <Result>
        {' '}
        {checkbox1 && (
          <p>
            {JSON.stringify(
              checkbox1.map((e) => {
                console.log(e);
                delete e.checkbox;
                return e;
              }) && checkbox1
            )}
          </p>
        )}
      </Result>


      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={data}
        checkbox
        headCheckboxID='id6'
        bodyCheckboxID='checkboxes6'
        getValueCheckBox={(e) => {
          showLogs2(e);
        }}
        getValueAllCheckBoxes={(e) => {
          showLogs2(e);
        }}
        multipleCheckboxes
      />
 */