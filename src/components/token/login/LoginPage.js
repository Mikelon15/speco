import React from 'react';
import PropTypes from "prop-types";
import LoginForm from './LoginForm'; 
import { Button, Typography } from '@material-ui/core';
import Styles from '../styles';
import withStyles from '@material-ui/core/styles/withStyles';

export class LoginPage extends React.Component {
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
    let { error } = this.props; 
    return (
      <div>
          <Typography variant='title'>Sign in</Typography>
          
          {(error) ?
              <Typography color="error">{error.toString()}</Typography> : "" 
          }
          
          <LoginForm
            onChange={this.updateUserState}
            onSave={this.createUser}
            user={this.state.user} />
          
          <div id="toggleLogin">
            <Typography>
              Dont have an account? 
              <a onClick={e=>{e.preventDefault(); this.props.toggle()}}> 
                Sign Up 
              </a>
            </Typography>
          </div>
         
          <Button 
            type="submit"
            fullWidth
            variant="raised"
            color="primary" 
            style={{float: 'right'}}
            onClick={this.createUser}>
            Login
          </Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  // error: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(Styles)(LoginPage);
