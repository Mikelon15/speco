import React from 'react';
import { connect } from 'react-redux';
import Journal from './containers/Journal';
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

    let { auth, signOut } = this.props;
    let list =  (
      <div>

        <h1>SPECO</h1>
        <div
          container
          direction="row"
          className="app-root"
          justify="space-between"
          alignItems="center"
        >
          <div item xs={6} md={4}>
            <Journal />
            <button onClick={ e => {e.preventDefault(); signOut()}}> Signout </button>
          </div>
          <div item xs={6} md={4}>
            <textarea text={this.props.text} onChangeAction={this.props.onChangeAction}/>
          </div>
          <div item xsHidden md={4}>
          </div>
        </div>
      </div>
    );
    let Appi = (auth) ? list : <UserAuth />
    return (
      <div  id="app">
        {Appi}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
