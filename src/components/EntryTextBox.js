import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const EntryTextBox = ({}) => (
  <FormGroup controlId="formControlsTextarea">
    <ControlLabel> Textarea </ControlLabel>
    <FormControl componentClass="textarea" placeholder="textarea" />
  </FormGroup>
)

export default EntryTextBox
