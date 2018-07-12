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

let SignUp = ( { onSubmit } ) => {
    let input = {email: "",  username: "",  password: "",  confirm: ""}
    return (
    <div>
    <form onSubmit={e => {
        e.preventDefault()
        onSubmit(input)
    }}>
      SignUp
      <FieldGroup
        id="formControlsEmail"
        type="email"
        label="Email address"
        placeholder="Enter email"
        onChange= {e => {input.email = e.target.value}}
      />
      <FieldGroup
        id="formControlsUsername"
        type="username"
        label="Username"
        placeholder="Enter username"
        onChange= {e => {input.username = e.target.value}}
      />
      <FieldGroup
        id="formControlsPassword"
        label="Password"
        type="password"
        placeholder="password"
        onChange= {e => {input.password = e.target.value}}
      />
      <FieldGroup
        id="formControlsPasswordConfirm"
        label="Password"
        type="password"
        placeholder="password"
        onChange= {e => {input.confirm = e.target.value}}
      />
      <Button type="submit"> Submit </Button>
    </form>
    </div>
  )
}


export default SignUp;
