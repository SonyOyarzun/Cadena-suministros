import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { MDBDataTableV5, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import _default from 'react-bootstrap/esm/CardColumns';

export default function WithMultipleCheckboxes() {

  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  let columns = []
  let preRows = []
  let rows = []
  let data = []
  let count = 0


  const toggleCheck = e => {
    let checkedArr = checked;
    checkedArr.filter(name => name === e.target.id)[0] 
      ? checkedArr = checkedArr.filter(name => name !== e.target.id)
      : checkedArr.push(e.target.id);
      setChecked([...checkedArr])
  };



  const isChecked = id => checked.filter(name => name === id)[0] ? true : false

console.log(checked)
console.log(checkbox)

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

    columns.push({
      check: 'check',
      label: '',
      field: 'check',
    }),

    Object.keys(products).map((key, row) => (

      preRows = [],
      preRows['check'] = <input label=" " value={JSON.stringify(products[key])} type="checkbox" id={'checkbox'+row} className="box" onClick={toggleCheck} checked={isChecked('checkbox'+row)} defaultChecked='false' />,

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
/*
let checkedValue = null; 
let inputElements = document.getElementsByClassName('box');
for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
           checkedValue = inputElements[i].value;
           break;
      }
}
*/



const click = e => {

    Object.keys(checked).map((key, row) => (
      console.log(document.getElementById(checked[key]).value)
    ))
  //  setCheckbox([...boxArr])

}

  return (
    <>
    <button onClick={click}/>
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

/**
 * 
 
 * 
  <MDBTable btn fixed>
    <MDBTableHead columns={data.columns} />
    <MDBTableBody rows={data.rows} />
   </MDBTable>
 */
