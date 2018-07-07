import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const EntryTextBox = ({ text, onChangeAction }) => (
  <div>
    <FormGroup controlId="formControlsTextarea">
      <ControlLabel> Textarea </ControlLabel>
      <FormControl componentClass="textarea"
        placeholder="textarea"
        onChange={e => {onChangeAction(e)}}
        value={text}
      >
      </FormControl>
    </FormGroup>
  </div>
)

EntryTextBox.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeAction: PropTypes.func.isRequired
}
export default EntryTextBox
