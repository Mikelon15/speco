import React from 'react';
import AddEntry from '../containers/AddEntry';
import Journal from '../containers/Journal';
import EditEntry from '../containers/EditEntry';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import { Col, Row } from 'react-bootstrap';

const App = () => (
  <div>
    <Row className="show-grid">
      <Col xs={6} md={4}>
        <Journal />
        <AddEntry />
      </Col>
      <Col xs={6} md={4}>
        <EditEntry />
      </Col>
      <Col xsHidden md={4}>
        <LogIn />
        <SignUp />
      </Col>
    </Row>

  </div>
);

export default App;
