import React from 'react'
import { connect } from 'react-redux'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { editEntryText } from '../actions/index.js'

const getActiveEntryText = (selected, entries) => {
  var i = entries.filter(e => e.id === selected)
  console.log(i.text)
  return i.text
}

const mapStateToProps = state => {
  return {
    text: getActiveEntryText(state.journal.selected, state.journal.entries)
  }
}
let EditEntry = ({ text, dispatch }) => {
  let input

  return (
    <div>
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel> Textarea </ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder="textarea"
          onChange={e => {
            e.preventDefault()
            dispatch(editEntryText(e.target.value))
          }}>
        </FormControl>
      </FormGroup>
    </div>
  )
}
EditEntry = connect(mapStateToProps)(EditEntry)

export default EditEntry
