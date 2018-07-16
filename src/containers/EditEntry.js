import { connect } from 'react-redux'
import { editEntryText } from '../actions/index'
import EntryTextBox from '../components/EntryTextBox'

const getActiveEntryText = (selected, entries) => {
  if(selected === -1)
    return ""
  let i = entries.filter(e => e.id === selected)[0]
  console.log(i.text)
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
