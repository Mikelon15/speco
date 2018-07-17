import React from 'react'
import { connect } from 'react-redux'
import { addNewEntry, signout } from '../actions'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <FormGroup
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addNewEntry(input.value))
          input.value = ''
        }}
      >
        <FormControl
          ref={node => {
            input = node
          }}
        />
        <Button type="submit">
          Add Entry
        </Button>
      </FormGroup>
      <Button onClick={ e => {e.preventDefault(); dispatch(signout())}}> Signout </Button>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
