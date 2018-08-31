import React from 'react';
import { connect } from 'react-redux';

// the two main components, render Journal or authenticate user 
import Journal from './containers/Journal';
import UserAuth from './containers/auth/UserAuth';


// finds the active entry to update text changes
const mapStateToProps = state => {
  return { auth: state.auth.logged }
}

const mapDispatchToProps = dispatch => {
  return {}
}

class App extends React.Component{
  render(){
    let { auth } = this.props;
    return (
      <div id="app">
        { (auth) ? <Journal /> : <UserAuth /> }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);