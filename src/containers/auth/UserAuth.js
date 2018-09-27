//---------------------------------------------------------------------
//    UserAuth.js
//
//    This file handles the connecting the Token container to the 
//    application data by feeding it data and actions  
//    
//    Author: Miguel Gutierrez
//---------------------------------------------------------------------

import { connect } from 'react-redux';
import Token from '../../components/token/Token.js';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword, toggleUserSubscribing, authClearError } from '../../actions/index'

const mapStateToProps = state => {
  return {
    subscribing: state.auth.subscribing,
    error: state.auth.error,
    fetching: state.user.fetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password) => { dispatch(signUpWithEmailAndPassword(email, password)) },
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
