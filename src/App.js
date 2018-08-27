import React from 'react';
import { connect } from 'react-redux';
import Journal from './containers/journal/Journal';
import UserAuth from './containers/UserAuth';
import { signout, resetEntryListHelper, editEntryText } from './actions/index'

let activeEntryKey = ""

// iterates through the entries list to find the selected one
const getActiveEntryText = (selected, entries) => {
  if(selected === "")
    return ""
  let i = entries.filter(e => e.key === selected)[0]
  activeEntryKey = i.key
  return i.text
}


const mapStateToProps = state => {
  return {
    // finds the active entry to update text changes
    auth: state.auth.logged,
    entry: state.entries.selected,
    text: getActiveEntryText(state.entries.selected, state.entries.entries)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // This is event triggers when a user selects an entry
    onChangeAction : e => {
      dispatch(editEntryText(e.target.value, activeEntryKey))
    },
    signOut: () => {
      dispatch(resetEntryListHelper())
      dispatch(signout())
    }
  }
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
