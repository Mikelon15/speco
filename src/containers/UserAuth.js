import { connect } from 'react-redux';
import Token from '../components/token/Token.js';

import { signInWithEmailAndPassword, signUpWithEmailAndPassword, toggleUserSubscribing, authClearError } from '../actions/index'

const mapStateToProps = state => {
  return {
    subscribing: state.auth.subscribing,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password, username) => { dispatch(signUpWithEmailAndPassword(email, password, username)) },
    onSignIn: e => { dispatch(signInWithEmailAndPassword(e)) },
    toggleUserSubscribing: () => { 
      dispatch(toggleUserSubscribing()) 
      dispatch(authClearError())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Token);
