import { connect } from 'react-redux';
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Token);
