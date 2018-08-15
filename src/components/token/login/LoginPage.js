import React from 'react';
import LoginForm from './LoginForm'; 
import { Button } from '@material-ui/core';

export class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: "",
        password: ""
      }
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  createUser(event) {
    event.preventDefault();
    console.log(this.state.user)
    this.props.onSubmit(this.state.user)
  }

  render() {
    return (
      <div>
        <h3>LOGIN</h3>
        <LoginForm
        onChange={this.updateUserState}
        onSave={this.createUser}
        user={this.state.user} />

        <div id="toggleLogin">
          <h5>Dont have an account? 
            <a href="" 
            onClick={e=>{e.preventDefault(); this.props.toggle()}}> 
              Sign Up 
            </a>
          </h5>
        </div>

        <Button 
        variant="contained" 
        color="primary" 
        type="submit"
        style={{float: 'right'}}
        onClick={this.createUser}>
          Login
        </Button>
      </div>
    );
  }
}

export default RegistrationPage;
