// import React, { Component } from 'react';
import { connect } from 'react-redux';
// import LogIn from '../components/login/LoginPage';
// import SignUp from '../components/SignUp';
import Token from '../components/token/Token.js';

import { signInWithEmailAndPassword, signUpWithEmailAndPassword, toggleUserSubscribing } from '../actions/index'

const mapStateToProps = state => {
  return {
    subscribing: state.auth.subscribing,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: e => { dispatch(signUpWithEmailAndPassword(e.email, e.password, e.username)) },
    onSignIn: e => { dispatch(signInWithEmailAndPassword(e)) },
    toggleUserSubscribing: () => { dispatch(toggleUserSubscribing()) }
  }
}

// class UserAuth extends Component{
//   render() {
//     let { error, subscribing, onSignUp, onSignIn, toggleUserSubscribing } = this.props;
//     let errorMsg = (error) ? error.toString() : ""
//     let authType = (subscribing) ?
//       (<SignUp onSubmit={onSignUp} onSignUp={toggleUserSubscribing} />) : (< LogIn onSubmit={onSignIn} /> )

//     return(
      // <Token 
      // <div>
      //   <h1> SPECO </h1>
      //   { errorMsg }
      //   { authType }
      // </div>
//     )
//   }
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Token);
