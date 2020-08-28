import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { MDBDataTableV5, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import _default from 'react-bootstrap/esm/CardColumns';

//import api
import Send from '../api/Send'

export default function WithMultipleCheckboxes() {

  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  let columns = []
  let preRows = []
  let rows = []
  let data = []
  let array = []
  let count = 0

  const getDataCheckbox = e => {
    Object.keys(checked).map((key, row) => (
      array.push(JSON.parse(document.getElementById(checked[key]).value))
    ))
    setCheckbox(array)
    console.log('Checked ',checkbox)
  }


  const toggleCheck = e => {
    let checkedArr = checked;
    checkedArr.filter(name => name === e.target.id)[0]
      ? checkedArr = checkedArr.filter(name => name !== e.target.id)
      : checkedArr.push(e.target.id);
    setChecked([...checkedArr])
    getDataCheckbox()
  };

  const isChecked = id => checked.filter(name => name === id)[0] ? true : false

  console.log(checked)
  console.log(checkbox)

  useEffect(() => {

    axios.get('json-api/my')
      .then(response => {
        setProducts(response.data);

      }).catch(error => {
        alert("Error " + error)
      })

    createJson

  }, []);

  const createJson = (

    columns.push({
      check: 'check',
      label: '',
      field: 'check',
    }),

    Object.keys(products).map((key, row) => (

      preRows = [],
      preRows['check'] = <input label=" " value={JSON.stringify(products[key])} type="checkbox" id={'checkbox' + row} className="box" onClick={toggleCheck} checked={isChecked('checkbox' + row)} defaultChecked='false' />,

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


 
  return (
    <>
      <Send getData={checkbox} />
      <MDBDataTableV5
        className='cust-table'
        responsive
        entriesOptions={[5, 10, 15]}
        entries={5}
        pagesAmount={4}
        bordered
        hover
        btn
        sortable={false}
        data={data}
      />
    </>
  );
}
