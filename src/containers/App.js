import React from 'react';
import { connect } from 'react-redux';
import AddEntry from './AddEntry';
// import EditEntry from './EditEntry';
// import Journal from './Journal';
import UserAuth from './UserAuth';
import { Col, Row } from 'react-bootstrap';
import { checkUserExists } from '../actions/index'
// toggleUserFetching

let app  = (
  <Row className="show-grid">
    <Col xs={6} md={4}>
      <AddEntry />
    </Col>
  </Row>
)
// <Journal />
// <Col xs={6} md={4}>
// <EditEntry />
// </Col>
// <Col xsHidden md={4}>
// </Col>

// connects to the store to check if there is a user session still active
const ScreenApp = connect(
  (state) => ({
    authorized: state.user.authorized
   })
)(({ authorized, dispatch }) => {
  //Check if user state persisted from last session.
  // If the user state is persisted, then there is a
  // authToken in the local storage that can be used to log in

  // console.log("AUTHORIZED CHANGED")
  // if(!authorized){
  //     console.log("CHECKING FOR USER")
  //     dispatch(checkUserExists())
  // }

  // if the authToken exists, render main app,
  // else render UserAuth to get token
  return (authorized) ? app : (<UserAuth />)
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
