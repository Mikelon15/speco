import React from 'react';
import { connect } from 'react-redux';
import Journal from './Journal';
import UserAuth from './UserAuth';
import EntryTextBox from '../components/EntryTextBox';
import { Grid, Button } from '@material-ui/core/';
import { signout, resetEntryListHelper, editEntryText } from '../actions/index'

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
      <div id="app">
      
        <h1>SPECO</h1>
        <Grid
          container
          direction="row"
          className="app-root"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6} md={4}>
            <Journal />
            <Button onClick={ e => {e.preventDefault(); signOut()}}> Signout </Button>
          </Grid>
          <Grid item xs={6} md={4}>
            <EntryTextBox  text={this.props.text} onChangeAction={this.props.onChangeAction}/>
          </Grid>
          <Grid item xsHidden md={4}>
          </Grid>
        </Grid>
      </div>
    );
    let Appi = (auth) ? list : <UserAuth />
    return (
      <div>
        {Appi}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
