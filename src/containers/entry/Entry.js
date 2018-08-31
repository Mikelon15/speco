import { connect } from 'react-redux';
import { editEntryText } from '../../actions';
import Editor from './Editor';

let activeEntryKey = ""

// iterates through the entries list to find the selected one
const getActiveEntryText = (selected, entries) => {
  console.log(entries)
  if(selected === "" || entries === undefined)
    return ""
  let i = entries.filter(e => e.key === selected)[0]
  activeEntryKey = i.key
  return i.text
}

const mapStateToProps = state => {
  return {
    // finds the active entry to update text changes
    text: getActiveEntryText(state.entries.selected, state.entries.entries)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // This is event triggers when a user selects an entry
    onChangeAction : e => {
      dispatch(editEntryText(e, activeEntryKey))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
