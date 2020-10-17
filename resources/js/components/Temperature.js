import React, { Component, Fragment } from 'react';
import {Card} from 'react-bootstrap';

import { getUser } from './tables/TableFunctions'
import Meter from '../components/extra/Meter';



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
              width: 400,
              height: 300,
              radius: 100
            }
          }

        return (
            <div>
            <Card  style={styles.size}>
            <Card.Body>
              <Card.Title>Medicion</Card.Title>
               <Card.Text>
               </Card.Text>
               <Meter radius={styles.size.radius}/>
            </Card.Body>
          </Card>
          </div>
        )
       
    }
    
}

export default Temperature;











