import React, { Component, useState, useRef} from 'react';
import ReactDOM from 'react-dom'

import { Button, Card, Container,Table,Row, Col} from 'react-bootstrap';

export default function Usuario() {
        
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);


  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  
  const styles = {
    padding: {
        paddingTop: "10vh",
        paddingBottom: "10vh",
        paddingRight: "10vw",
        paddingLeft: "10vw"
    }
}

  return (
<Container fluid style={styles.padding}>
<Row>
<Col>

<Card>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</Table>
    
  </Card.Body>
</Card>

</Col>
</Row>
</Container>
  );
}


