import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import { logInWithEmailAndPassword, signUpWithEmailAndPassword } from '../actions/index'

const mapStateToProps = state => {
  return {
    subscribing: state.user.subscribing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: e => {
        dispatch(signUpWithEmailAndPassword(e.email, e.password, e.username))
    },
    onlogIn: e => {
        dispatch(logInWithEmailAndPassword(e.email, e.password))
    }
  }
}

class UserAuth extends Component{
  render() {
    const authType = (this.props.subscribing) ? <SignUp onSubmit={this.props.onSignUp}/> : <LogIn onSubmit={this.props.onlogIn} />;
    return(
      <div>
      {authType}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAuth);
