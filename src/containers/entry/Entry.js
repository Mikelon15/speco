import React from 'react';
import { connect } from 'react-redux';
import { editEntryText, editEntryTitle } from '../../actions';
import EntryEditor from './EntryEditor';
import Empty from '../../media/empty.png';
import { Slide, Paper, Typography } from '@material-ui/core';

let activeEntryKey = ""

// iterates through the entries list to find the selected one
const getActiveEntryText = (selected, entries) => {
  // console.log(entries, selected)
  if (selected === "" || entries === undefined)
    return ""
  let i = entries.filter(e => e.key === selected)[0]
  activeEntryKey = i.key
  return i
}

const mapStateToProps = state => {
  let sel = getActiveEntryText(state.entries.selected, state.entries.entries);
  return {
    // finds the active entry to update text changes
    text: sel.text,
    title: sel.title,
    time: sel.time,
    journal: state.journal.selected,
    entry: state.entries.selected
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // This is event triggers when a user selects an entry
    onChangeAction: e => {
      dispatch(editEntryText(e, activeEntryKey))
    },
    changeEntryTitle: e => {
      dispatch(editEntryTitle(e.target.value, activeEntryKey))
    }
  }
}

class Entry extends React.Component {
  render() {
    let { entry } = this.props;
    let { text, title, time, onChangeAction, changeEntryTitle } = this.props;
    return (
      <div>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          {(entry !== "") ?
            <EntryEditor text={text} title={title} time={time} onChangeAction={onChangeAction} changeEntryTitle={changeEntryTitle} />
            :
            <Paper style={{ marginTop: '20%', padding: '20px', backgroundColor: '#fffcf7eb' }}>
              <img src={Empty}
                height="200" width="200" alt=""></img>
              <Typography variant="subheading">No Journal or Entry Selected</Typography>
            </Paper>
          }
        </Slide>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Entry)
