import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col className="transparent" sm={10}>
        <FormControl {...props} />
      </Col>
    </FormGroup>
  );
}

const TextInput = ({name, label, onChange, placeholder, value, type, error}) => {
  return (
    <div>
      <FieldGroup
        name={name}
        label={label}
        type={type}
        placeholder={placeholder}
        onChange = {onChange}
      />
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
