import React, { Component, Fragment, useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Result from '../Result';

import { map } from 'jquery';

export default function WithMultipleCheckboxes() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios.get('json-api/my')
      .then(response => {
        setProducts(response.data);
        console.log(response.data)
      }).catch(error => {
        alert("Error " + error)
      })

  }, []);


  let columns = []
  let preRows = []
  let rows = []
  let count = 0

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

  let data = {
    columns,
    rows
  };


  console.log('data', data)

  const [datatable, setDatatable] = React.useState([])

  if (data == {}) {
    datatable.push(data)
  }



  console.log('datatable', datatable)

  const [checkbox1, setCheckbox1] = useState([]);

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