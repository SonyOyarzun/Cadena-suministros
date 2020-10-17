import React, { Component, Fragment } from 'react';
import { Card } from 'react-bootstrap';

import { getUser } from './tables/TableFunctions'
import Meter from '../components/extra/Meter';
import Lineal from '../components/extra/Lineal';


class Temperature extends Component {

    constructor() {
        super()
        this.state = {
            user: []
        }
    }



    componentDidMount() {

    }

    render() {

        const styles = {
            size: {
                margin: 30,
                radius: 80
            },
        }

        return (
            <div className='group-form'>
                <Card className='row'>
                    <Card.Body className='col-sm-4' style={styles.size}>
                        <Card.Title>Temperatura</Card.Title>
                        <Card.Text>
                        </Card.Text>
                        <Meter radius={styles.size.radius} />
                    </Card.Body>
                </Card>

                <Card className='row'>
                    <Card.Body className='col-sm-12' style={styles.size}>
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

export default Temperature;











