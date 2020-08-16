import React, { Component } from 'react'
import { MDBDataTable, MDBNavLink } from 'mdbreact';

export default class Testing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            users: []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                console.log(data, "data")
                let dataFromApi = data.map(user => {
                    return {
                        maindId: user.id,
                        username: user.name,
                        email: user.email
                    }
                })
                this.setState({
                    users: dataFromApi
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const data = {
            columns: [
                {
                    label: 'NAME',
                    field: 'name11',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'USERNAME',
                    field: 'username',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'EMAIL',
                    field: 'email',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'PHONE',
                    field: 'phone',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'City',
                    field: 'city',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: [
                this.state.users.map((data, i) => (
                    {
                        name: <MDBNavLink key={i} className="link-new" to="/manageCustomers/customerDetails">{data.name}</MDBNavLink>,
                        username: 'tiger_22',
                        email: 'tiger@yhaoo.com',
                        phone: '1234567',
                        city: 'Delhi'
                    }
                ))
            ]
        };
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

