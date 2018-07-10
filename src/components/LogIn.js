import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

const LogIn = () => (
    <div>
    <form >
      LogIn
      <FieldGroup
      id="formControlsEmail"
      type="email"
      label="Email address"
      placeholder="Enter email"
    />
    <FieldGroup id="formControlsPassword" label="Password" type="password" placeholder="password"/>
    <h5> Dont have an account? <a href=""> Sign up </a> </h5>
    <Button type="submit"> Submit </Button>
    </form>
    </div>
)


export default LogIn;
