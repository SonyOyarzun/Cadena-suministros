import React, { Component, Fragment } from 'react';
import { Card } from 'react-bootstrap';

import { getUser, getConfig } from './tables/TableFunctions'
import Meter from '../components/extra/Meter';
import Lineal from '../components/extra/Lineal';
import Load from '../components/extra/Load';

import { NavLink, Link, withRouter } from 'react-router-dom';

import { getMeter } from './extra/ExtraFunctions';
import { create, transfer, registerMeter } from './api/CRAB';

class Temperature extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id : props.match.params.id, //parametro desde url, routes
            value: null,
            min: null,
            max: null,
            chain : null,
            config: [],
            transaction: [],
            asset: null,
        }
        this.start = this.start.bind(this);

    }

    keysCreate = {
        publicKey: '8t6F2tkjtReYVFSiEzoKazzJS9n9MmfgQp1uqWABym84',
        privateKey: '83cPMqhrRnofy3EVE4SPMqVCokjWcKZTLuadqprRgLFB',
    }

    start() {

        create(this.state, this.state, this.keysCreate, this.state.config)
        .then(response => {
            console.log('start create response ', response)
            this.setState({ transaction: response, asset: response.id })
        }).catch(error => {
            console.log('error ', error)
        })

    }

    componentDidMount() {

        this.start()

        axios.all([
            getConfig(),
            getMeter()
        ])
            .then(responseArr => {
                this.setState({
                    config: responseArr[0],
                })
                console.log('Temperature mount:',responseArr)
                    this.setState({
                        chain:  responseArr[1][responseArr[1].length - 1][0],
                        value:  responseArr[1][responseArr[1].length - 1][1],
                        min:    responseArr[1][responseArr[1].length - 1][2],
                        max:    responseArr[1][responseArr[1].length - 1][3],
                    })  

            })

    }

    render() {

    //    console.log('Temperature :',this.state)

        const styles = {
            size: {
                radius: 80
            },
            size2: {
                marginTop: 10
            },
        }

        if (this.state.value == null || this.state.asset == null) {

            return (<Load />)

        } else {

            return (
                <div>

                    <Card style={styles.size2}>
                        <Card.Body className='float-left'>
                            <Card.Title>Temperatura</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <Meter data={this.state} radius={styles.size.radius} />
                        </Card.Body>
                    </Card>


                    <Card style={styles.size2}>
                        <Card.Body className='' style={styles.size2}>
                            <Card.Title>Medicion</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <Lineal data={this.state}  height={200} width={200} />
                        </Card.Body>
                    </Card>
                </div>
            )

        }
    }
}

export default Temperature










