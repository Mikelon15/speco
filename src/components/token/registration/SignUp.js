import React from 'react';
class SignUp extends React.Component {
  render(){
    let onSubmit = this.props;
    let input = {email: "",  username: "",  password: "",  confirm: ""}
    return (
    <div>
    <form onSubmit={e => {
        e.preventDefault()
        onSubmit(input)
    }}>
      SignUp
      <br></br>
      <input
        type="email"
        label="Email address"
        placeholder="Enter email"
        onChange= {e => {input.email = e.target.value}}
      />
      <input
        type="username"
        label="Username"
        placeholder="Enter username"
        onChange= {e => {input.username = e.target.value}}
      />
      <input
        label="Password"
        type="password"
        placeholder="password"
        onChange= {e => {input.password = e.target.value}}
      />
      <input
        label="Password"
        type="password"
        placeholder="password"
        onChange= {e => {input.confirm = e.target.value}}
      />
    </form>
    <div>Have an account?<a href="#" onClick={e => {e.preventDefault(); this.props.toggle()}}>Login</a></div>
    </div>
  )}
}


export default SignUp;
// <Button type="submit"> Submit </Button>
