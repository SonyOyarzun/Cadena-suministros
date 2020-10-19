import React, { Component, Fragment } from 'react';
import { Card } from 'react-bootstrap';

import { getUser, getConfig } from './tables/TableFunctions'
import Meter from '../components/extra/Meter';
import Lineal from '../components/extra/Lineal';

import { NavLink, Link, withRouter } from 'react-router-dom';


class Temperature extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 10.6,
            min: 2,
            max: 20,
            config: []
        }

    }

    componentDidMount(){

        getConfig().then(response => {
            this.setState({ config: response })
          })

    }

    render() {

        const styles = {
            size: {
                radius: 80
            },
            size2: {
                marginTop: 10
            },
        }

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
                        <Lineal height={200} width={200} />
                    </Card.Body>
                </Card>
            </div>
        )

    }

}

export default Temperature










