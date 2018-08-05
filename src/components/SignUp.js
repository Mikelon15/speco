import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { withStyles, TextField } from '@material-ui/core';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: 1000
  },
});

let SignUp = ( { onSubmit } ) => {
    let input = {email: "",  username: "",  password: "",  confirm: ""}
    return (
    <div>
    <form onSubmit={e => {
        e.preventDefault()
        onSubmit(input)
    }}>
      SignUp
      <TextField
        fullWidth
        margin="normal"
        id="formControlsEmail"
        type="email"
        label="Email address"
        placeholder="Enter email"
        onChange= {e => {input.email = e.target.value}}
      />
      <TextField
        fullWidth
        margin="normal"
        id="formControlsUsername"
        type="username"
        label="Username"
        placeholder="Enter username"
        onChange= {e => {input.username = e.target.value}}
      />
      <TextField
        fullWidth
        margin="normal"
        id="formControlsPassword"
        label="Password"
        type="password"
        placeholder="password"
        onChange= {e => {input.password = e.target.value}}
      />
      <TextField
        fullWidth
        margin="normal"
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


export default withStyles(styles)(SignUp);
