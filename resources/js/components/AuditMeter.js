import React, { Component, Fragment } from 'react';
import { Card } from 'react-bootstrap';

import { getUser, getConfig , searchMetadata } from './tables/TableFunctions'
import Meter from './extra/Meter';
import Audit from './extra/Audit';
import Auto from './extra/AutoComplete';
import Load from './extra/Load';

import { NavLink, Link, withRouter } from 'react-router-dom';

import { getMeter } from './extra/ExtraFunctions';
import { create, transfer } from './api/CRAB';

//import datable
import { MDBDataTableV5, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from 'mdbreact';



class AuditMeter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id, //parametro desde url, routes
            config: [],
            user: [],
            data: []
        }
        this.onTagsChange = this.onTagsChange.bind(this)
    }

    componentDidMount() {

        getConfig().then(response => {
            this.setState({ config: response })
        })

    }

    onTagsChange(event, values) {

        const search = {asset:'user-'+values.id}

        searchMetadata(search).then(response => {
            this.setState({ data: response })
            console.log(response)
        })
    }

    render() {
        console.log('user onChange', this.state.user)
        //    console.log('Temperature :',this.state)

        const styles = {
            size: {
                radius: 80
            },
            size2: {
                marginTop: 10
            }, border: {
                height: '100px',
                paddingTop: "1vh",
                paddingBottom: "1vh",
            }
        }


        if (this.state.config == null) {

            return (<Load />)

        } else {

            return (
                <div>
                    <Card style={styles.size2}>

                        <Card.Header>
                            <MDBRow fluid style={styles.border}>
                                <MDBCol size="4">
                                    <Auto onTagsChange={this.onTagsChange} label={'Usuario a Auditar'} />
                                </MDBCol>
                            </MDBRow>
                        </Card.Header>


                        <Card.Body className='' style={styles.size2}>
                            <Card.Title>Medicion</Card.Title>
                            <Card.Text>
                            </Card.Text>
                          
                        </Card.Body>
                    </Card>
                </div>
            )

        }
    }
}

export default AuditMeter



// -- <Audit data={this.state} height={200} width={200} />






