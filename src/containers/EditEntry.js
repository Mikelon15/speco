import { connect } from 'react-redux'
import { editEntryText } from '../actions/index'
import EntryTextBox from '../components/EntryTextBox'

const getActiveEntryText = (selected, entries) => {
  if(selected === "")
    return ""
  let i = entries.filter(e => e.key === selected)[0]
  return i.text
}

const mapStateToProps = state => {
  return {
    text: getActiveEntryText(state.journal.selected, state.journal.entries)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChangeAction : e => {
      dispatch(editEntryText(e.target.value))
    }
  }
}

const EditEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryTextBox)
export default EditEntry
