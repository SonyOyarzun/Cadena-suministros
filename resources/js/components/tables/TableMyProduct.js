import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { MDBDataTableV5, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import _default from 'react-bootstrap/esm/CardColumns';

//import BigchainDB from 'bigchaindb-driver';

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
      preRows['check'] = <input label=" " value={JSON.stringify(products[key])} type="checkbox" id={'checkbox' + row} className="box" onClick={toggleCheck} checked={isChecked('checkbox' + row)} defaultChecked='false' />,

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


  const confirm = e => {

    let array = []
    Object.keys(checked).map((key, row) => (
      array.push(JSON.parse(document.getElementById(checked[key]).value))
    )),
      window.confirm('¿Desea enviar estos productos al destinatario ?') &&
      console.log(array)

    const BigchainDB = require('bigchaindb-driver')
    //const API_PATH = 'http://192.168.99.100:9984/api/v1/'
    //https://test.ipdb.io/api/v1/transactions/63b1c9f795448346b501f20b259edea95627033403cb7ab20a3e53668912ee47
    const API_PATH = 'https://test.ipdb.io/api/v1/'

    // Create a new keypair.
    const alice = new BigchainDB.Ed25519Keypair()

    // Construct a transaction payload
    const tx = BigchainDB.Transaction.makeCreateTransaction(
      // Data JSON
      { array },

      // Metadata contains information about the transaction itself
      // (can be `null` if not needed)
      { what: 'Envio de Productos' },

      // A transaction needs an output
      [BigchainDB.Transaction.makeOutput(
        BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))
      ],
      alice.publicKey
    )

    // Sign the transaction with private keys
    const txSigned = BigchainDB.Transaction.signTransaction(tx, alice.privateKey)

    // Send the transaction off to BigchainDB
    let conn = new BigchainDB.Connection(API_PATH)

    conn.postTransactionCommit(txSigned)
      .then(res => {
        const elem = document.getElementById('lastTransaction');
        elem.href = API_PATH + 'transactions/' + txSigned.id;
        elem.innerText = txSigned.id;
        console.log('Transaction', txSigned.id, 'accepted');
      })
    console.log(txSigned);
    // Check console for the transaction's status

  }

  return (
    <>
      <button onClick={confirm} />
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
