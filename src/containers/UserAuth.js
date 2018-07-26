import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from '../components/login/LoginPage';
import SignUp from '../components/SignUp';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword, toggleUserSubscribing } from '../actions/index'

const mapStateToProps = state => {
  return {
    subscribing: state.auth.subscribing,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: e => {
        dispatch(signUpWithEmailAndPassword(e.email, e.password, e.username))
    },
    onSignIn: e => {
        dispatch(signInWithEmailAndPassword(e.email, e.password))
    },
    toggleUserSubscribing: () => {
      dispatch(toggleUserSubscribing())
    }
  }
}

class UserAuth extends Component{
  render() {
    let errorMsg = (this.props.error) ? this.props.error.toString() : ""
    const authType = (this.props.subscribing) ?
      (
        <div>
          {errorMsg}
          <SignUp onSubmit={this.props.onSignUp} />
          Already have an account? <a href="" onClick={e=>{e.preventDefault(); this.props.toggleUserSubscribing()}}> Sign In </a>
        </div>
      ) :
      (
        <div>
          {errorMsg}
          <LogIn onSubmit={this.props.onSignIn} />;
          Dont have an account? <a href="" onClick={e=>{e.preventDefault(); this.props.toggleUserSubscribing()}}> Sign Up </a>
        </div>
      )
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
