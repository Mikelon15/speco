import React from 'react';
import { connect } from 'react-redux';
import Journal from './Journal';
import UserAuth from './UserAuth';
import { Col, Row, Button } from 'react-bootstrap';
import { signout, resetEntryListHelper } from '../actions/index'

const mapStateToProps = state => {
  return {
    // finds the active entry to update text changes
    auth: state.auth.logged,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // This is event triggers when a user selects an entry
    // onChangeAction : e => {
      // dispatch(editEntryText(e.target.value, activeEntryKey))
    // }
    signOut: () => {
      dispatch(resetEntryListHelper())
      dispatch(signout())
    }
  }
}

class App extends React.Component{
  render(){
    let { auth, signOut } = this.props;
    let list =  (
      <div> SPECO
        <Row className="show-grid">
          <Col xs={6} md={4}>
            Shelf
            <Journal />
            <Button onClick={ e => {e.preventDefault(); signOut()}}> Signout </Button>
          </Col>
          <Col xs={6} md={4}>
          </Col>
          <Col xsHidden md={4}>
          </Col>
        </Row>
      </div>
    );
    let Appi = (auth) ? list : <UserAuth />
    return (
      <div>
        {Appi}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
