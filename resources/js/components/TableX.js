import React, { Component } from 'react'
import { MDBDataTable, MDBNavLink } from 'mdbreact';

export default class TableX extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            users:[]
        }
      }
  
      componentDidMount(){
  
        axios.get('user').then(response=>{
          this.setState({users:response.data})
        }).catch(error=>{
          alert("Error "+error)
        })
  
      }


    render() {

        const data = {
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
                ...this.state.users.map((data, i) => (
                    {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        role: data.role

                    }
                ))
            ]
        };

        console.log(data,'data2')
        return (
            <div>
                <section className="tanning">
                    <div className="container">
                        <h1>Customer Details</h1>
                        <div className="introductory_details customer-table">
                            <MDBDataTable
                                className='cust-table'
                                responsive
                                bordered
                                hover
                                btn
                                data={data}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

