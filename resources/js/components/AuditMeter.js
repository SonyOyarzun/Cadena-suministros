import React, { Component, Fragment } from 'react';
import { Card } from 'react-bootstrap';

import { getAsset, getTransaction, getConfig, searchMetadata, } from './tables/TableFunctions'
import Meter from './extra/Meter';
import Audit from './extra/Audit';
import Auto from './extra/AutoComplete';
import Load from './extra/Load';

import { NavLink, Link, withRouter } from 'react-router-dom';

import { getMeter, lastMeterTx } from './extra/ExtraFunctions';
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

        const search = { id: values.id }

        console.log('search', search)

        lastMeterTx(search).then(last => {

            if (last.length > 0) {

                if (last[0].hasOwnProperty('tx')) {

                    const transaction = { asset: last[0].tx }

                    console.log('transaction', transaction)

                    getTransaction(transaction).then(response => {

                        if (response.metadata.hasOwnProperty('metadata')) {
                       //     this.setState({ data: response.metadata.metadata })
                         //   console.log('onTagsChange', response.metadata.metadata)

                            let array = []
                            let row = []
                
                            response.metadata.metadata.map((content, index) => (
                
                
                                row[index] = [content.fecha, content.temp[1], content.temp[2], content.temp[3]],
                
                                array.push(row)
                           // ,    console.log('row:', row)
                            ))
                
                            this.setState({ data: array })

                        } else {
                            this.setState({ data: [['C°', 'T', 'Min', 'Max'], [0, 0, 0, 0]] })
                        }

                    })

                } else {

                    this.setState({ data: [['C°', 'T', 'Min', 'Max'], [0, 0, 0, 0]] })
                }

            } else {

                this.setState({ data: [['C°', 'T', 'Min', 'Max'], [0, 0, 0, 0]] })
            }

        })

    }

    render() {
            console.log('Temperature :',this.state)

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
                    <Card>

                        <Card.Header>
                            <MDBRow fluid style={styles.border}>
                                <MDBCol size="4">
                                    <Auto onTagsChange={this.onTagsChange} label={'Usuario a Auditar'} />
                                </MDBCol>
                            </MDBRow>
                        </Card.Header>


                        <Card.Body>
                            <Card.Title>Medicion</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <Audit data={this.state} height={200} width={200} />
                        </Card.Body>
                    </Card>
                </div>
            )

        }
    }
}

export default AuditMeter



// -- <Audit data={this.state} height={200} width={200} />






