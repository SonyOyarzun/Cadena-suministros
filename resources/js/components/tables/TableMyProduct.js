import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { MDBDataTableV5, MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from 'mdbreact';
import _default from 'react-bootstrap/esm/CardColumns';

//import api
import Send from '../api/Send'

import Load from '../extra/Load'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function TableMyProduct() {

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userSend, setUserSend] = useState();
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
    console.log('Checked :', checkbox,'userSend :',userSend)
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

    axios.get('user/list')
      .then(response => {
        setUsers(response.data);

      }).catch(error => {
        alert("Error " + error)
      })

    createJson

    demoAsyncCall().then(() => setLoading(false));

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

  //console.log('users :', users)

  const onTagsChange = (event, values) => {
    setUserSend({
      values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(users);
    });
  }

  if (loading) { // if your component doesn't have to wait for an async action, remove this block 
    return <Load />; // render null when app is not ready
  } else {


    return (
      <>
        <MDBRow>
          <MDBCol size="6"><Send getData={checkbox} getUserSend={userSend} /></MDBCol>
          <MDBCol size="6">
            <Autocomplete
              id="userToSend"
              options={users}
              getOptionLabel={option => (option.name)}
              onChange={onTagsChange}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Usuario a enviar" variant="outlined" />}
            /></MDBCol>
        </MDBRow>

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
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}
