import React from 'react';
import { connect } from 'react-redux';
// import AddEntry from './AddEntry';
// import EditEntry from './EditEntry';
import Journal from './Journal';
// import UserAuth from './UserAuth';
import LogIn from '../components/login/LoginPage';
import { Col, Row } from 'react-bootstrap';
import { checkUserExists } from '../actions/index'
// toggleUserFetching

let ScreenApp  = (
  <Row className="show-grid">
    <Col xs={6} md={4}>
    </Col>
    <Col xs={6} md={4}>
    </Col>
    <Col xsHidden md={4}>
    </Col>
  </Row>
)

// <EditEntry />
// <AddEntry />
// <Journal />
// connects to the store to check if there is a user session still active
// const ScreenApp = connect(
//   (state) => ({
//     authorized: state.user.authorized
//    })
// )(({ authorized, dispatch }) => {
//   //Check if user state persisted from last session.
//   // If the user state is persisted, then there is a
//   // authToken in the local storage that can be used to log in
//
//   // console.log("AUTHORIZED CHANGED")
//   if(!authorized){
//       console.log("CHECKING FOR USER")
//       dispatch(checkUserExists())
//   }
//
//   // if the authToken exists, render main app,
//   // else render UserAuth to get token
//   return (authorized) ? app : (<UserAuth />)
// });

const mapStateToProps = state => {
  return {
    // finds the active entry to update text changes
    auth: state.user.authorized
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // This is event triggers when a user selects an entry
    // onChangeAction : e => {
      // dispatch(editEntryText(e.target.value, activeEntryKey))
    // }
  }
}

class App extends React.Component{
  render(){
    let list =  (
      <div> HAS USER
      <Journal />
      </div>
    );
    let { auth } = this.props;
    let Appi = (auth) ? list : <LogIn />
    console.log(auth);
    return (
      <div>
        {Appi}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
