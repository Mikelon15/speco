import React from 'react';

let SignUp = ( { onSubmit } ) => {
    let input = {email: "",  username: "",  password: "",  confirm: ""}
    return (
    <div>
    <form onSubmit={e => {
        e.preventDefault()
        onSubmit(input)
    }}>
      SignUp
      <input
        fullWidth
        margin="normal"
        id="formControlsEmail"
        type="email"
        label="Email address"
        placeholder="Enter email"
        onChange= {e => {input.email = e.target.value}}
      />
      <input
        fullWidth
        margin="normal"
        id="formControlsUsername"
        type="username"
        label="Username"
        placeholder="Enter username"
        onChange= {e => {input.username = e.target.value}}
      />
      <input
        fullWidth
        margin="normal"
        id="formControlsPassword"
        label="Password"
        type="password"
        placeholder="password"
        onChange= {e => {input.password = e.target.value}}
      />
      <input
        fullWidth
        margin="normal"
        id="formControlsPasswordConfirm"
        label="Password"
        type="password"
        placeholder="password"
        onChange= {e => {input.confirm = e.target.value}}
      />
    </form>
    </div>
  )
}


export default SignUp;
// <Button type="submit"> Submit </Button>
