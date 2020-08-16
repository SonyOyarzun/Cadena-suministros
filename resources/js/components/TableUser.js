import React from 'react';
import { MDBDataTableV5, MDBBadge } from 'mdbreact';

export default function TableUser(props) {

  console.log('despues arreglo')
  console.log(props.arreglo)

 // const [datatable, setDatatable] = React.useState({
   const data={
    columns: [
      {
        label: 'ID',
        field: 'id',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'ID',
        },
      },
       {
        label: 'Nombre',
        field: 'name',
        width: 150,
      },
      {
        label: 'Email',
        field: 'email',
        width: 200,
      },
      {
        label: 'Rol',
        field: 'role',
        sort: 'asc',
        width: 100,
      }
    ],
    rows: [
        
      ...props.arreglo.map((row, order) => 
      (
        {
        name: 'row.name',
        email:'row.email',
        role: 'row.role',
        }
      )
      ),
      
    ],
  }
  //});

//console.log(datatable)


  const badgesData = {
    columns: [
      {
        label: 'ID',
        field: 'badge',
      },
    //  ...datatable.columns,
    ...data.columns,
    ],
    rows: [
     // ...datatable.rows.map((row, order) => ({
      data.rows.map((row, order) => ({
        ...row,
        badge: (
          <MDBBadge pill color='primary' className='p-1 px-2' key={order} searchvalue={order}>
            ID: {order + 1}
          </MDBBadge>
        ),
      })),
    ],
  };

  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={badgesData} sortRows={['badge']} />;
}