import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { MDBDataTableV5,MDBContainer, MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from 'mdbreact';

//import api
import Create from '../api/Create'


import Auto from '../extra/AutoComplete'


export default function TableMyProduct(props) {

  const [userSend, setUserSend] = useState({});
  const [checked, setChecked] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  let columns = []
  let preRows = []
  let rows = []
  let data = []
  let array = []
  let count = 0

  const getDataCheckbox = checkedArr => {
    Object.keys(checkedArr).map((key, row) => (
      array.push(JSON.parse(document.getElementById(checkedArr[key]).value))
    ))
    setCheckbox(array)
    console.log('Checked :', array, 'userSend :', userSend)
  }


  const toggleCheck = e => {
  // multiseleccion  
  //let checkedArr = checked;
  let checkedArr = [];
    checkedArr.filter(name => name === e.target.id)[0]
      ? checkedArr = checkedArr.filter(name => name !== e.target.id)
      : checkedArr.push(e.target.id);
    setChecked(checkedArr)
   getDataCheckbox(checkedArr)
  };

  

  const isChecked = id => checked.filter(name => name === id)[0] ? true : false


  useEffect(() => {

    axios.get('user/list')
      .then(response => {

      }).catch(error => {
        console.log("Error " + error)

      })


  }, []);

  const createJson = (

    columns.push({
      check: 'check',
      label: '',
      field: 'check',
    }),

    Object.keys(props.products).map((key, row) => (

      preRows = [],
      preRows['check'] = <input label=" " value={JSON.stringify(props.products[key])} type="checkbox" id={'checkbox' + row}  className="box"   onClick={toggleCheck}  checked={isChecked('checkbox' + row)} defaultChecked='false' />,

      Object.keys(props.products[key]).map((key2, col) => (
        {
          ...count < Object.keys(props.products[key]).length &&
          columns.push({
            label: key2,
            field: key2,
          }),
        },
        preRows[key2] = props.products[row][key2],
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
  const styles = {
    border: {
        height       : '100px',
        paddingTop   : "1vh",
        paddingBottom: "1vh",
    }
}


  const onTagsChange = (event, values) => {
    setUserSend({
      values
    }, () => {
     // console.log(users);
    });
  }




    return (
      <>
      
        <MDBRow style={styles.border}>
          <MDBCol size="2"><Create getData={checkbox} getUserSend={userSend} disabled={'true'} /></MDBCol>
          <MDBCol size="4">
            <Auto onTagsChange={onTagsChange}/>
          </MDBCol>
          </MDBRow>


          <MDBRow>
          <MDBCol size="12">
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
              disableRetreatAfterSorting 
            />
          </MDBCol>
        </MDBRow>
      </>
    );

}

