import { connect } from 'react-redux';
import { editEntryText, editEntryTitle } from '../../actions';
import EntryEditor from './EntryEditor';

let activeEntryKey = ""

// iterates through the entries list to find the selected one
const getActiveEntryText = (selected, entries) => {
  // console.log(entries, selected)
  if(selected === "" || entries === undefined)
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
    time: sel.time
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // This is event triggers when a user selects an entry
    onChangeAction : e => {
      dispatch(editEntryText(e, activeEntryKey))
    },
    changeEntryTitle: e => {
      dispatch(editEntryTitle(e.target.value, activeEntryKey))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryEditor)
