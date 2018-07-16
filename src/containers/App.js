import React from 'react';
import { connect } from 'react-redux';
import AddEntry from './AddEntry';
import Journal from './Journal';
import EditEntry from './EditEntry';
import UserAuth from './UserAuth';
import { Col, Row, Button } from 'react-bootstrap';
import { checkUserExists, toggleUserFetching, signout } from '../actions/index'


const app = signout => (
  <Row className="show-grid">
    <Col xs={6} md={4}>
      <Journal />
      <AddEntry />
      <Button onClick={ e => {e.preventDefault(); signout()}}> Signout </Button>
    </Col>
    <Col xs={6} md={4}>
      <EditEntry />
    </Col>
    <Col xsHidden md={4}>
    </Col>
  </Row>
)

// connects to the store to check if there is a user session still active
const ScreenApp = connect(
  (state) => ({
    authorized: state.user.authorized,
    isFetching: state.user.isFetching
   })
)(({ authorized, isFetching, dispatch }) => {
  //Check if user state persisted from last session.
  // If the user state is persisted, then there is a
  // authToken in the local storage that can be used to log in
  if(!isFetching && !authorized){
    dispatch(toggleUserFetching())
    dispatch(checkUserExists())
  }
  let signoutUser = dispatch(signout)
  // if the authToken exists, render main app,
  // else render UserAuth to get token
  return (authorized) ? app(signoutUser) : (<UserAuth />)
});

class App extends React.Component{
  render(){
    return (
      <div>
        <ScreenApp />
      </div>
    )
  }
}

export default App;
