import { connect } from 'react-redux'
import { editEntryText } from '../actions/index'
import EntryTextBox from '../components/EntryTextBox'

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
    text: getActiveEntryText(state.journal.selected, state.journal.entries)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // This is event triggers when a user selects an entry
    onChangeAction : e => {
      dispatch(editEntryText(e.target.value, activeEntryKey))
    }
  }
}

const EditEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryTextBox)
export default EditEntry
