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

const SignUp = () => (
    <div>
    <form >
      SignUp
      <FieldGroup
        id="formControlsEmail"
        type="email"
        label="Email address"
        placeholder="Enter email"
      />
      <FieldGroup
        id="formControlsEmail"
        type="username"
        label="User Name"
        placeholder="Enter username"
      />
      <FieldGroup id="formControlsPassword" label="Password" type="password" placeholder="password"/>
      <FieldGroup id="formControlsConfirmPassword" label="Confirm Password" type="password" placeholder="password"/>
      <Button type="submit"> Submit </Button>
    </form>
    </div>
)


export default SignUp;
