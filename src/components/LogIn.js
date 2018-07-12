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

let LogIn = ({ onSubmit }) => {
  let input = {email: "", password: ""}
  return (
    <div>
    <form onSubmit={e => {
       e.preventDefault()
       onSubmit(input)
     }}> LogIn
      <FieldGroup
        id="formControlsEmail"
        type="email"
        label="Email address"
        placeholder="Enter email"
        onChange = { e => {input.email = e.target.value}}
      />
      <FieldGroup
        id="formControlsPassword"
        label="Password"
        type="password"
        placeholder="password"
        onChange = { e => {input.password = e.target.value}}
      />
      <h5> Dont have an account? <a href=""> Sign up </a> </h5>
      <Button type="submit"> Submit </Button>
      </form>
    </div>
  )
}


export default LogIn;
