import React from 'react';
import PropTypes from "prop-types";
import LoginForm from './LoginForm'; 
import { Button, Typography } from '@material-ui/core';
import Styles from '../styles';
import withStyles from '@material-ui/core/styles/withStyles';

class LoginPage extends React.Component {
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
    this.props.onSubmit(this.state.user)
  }


  render() {
    let { error, classes } = this.props; 

    let message = "", valid = true; 
    if(error) {
      valid = false;
      if(error) {
        switch(error.code){
          case("auth/invalid-email"): 
            message = "Account could not be found with credentials provided";
            break;
          case("auth/user-not-found" ): 
            message = "Account could not be found with credentials provided";
            break;
          case("auth/too-many-requests"): 
            message = error.message; 
            break;
          case("auth/wrong-password"): 
            message = "Account could not be found with credentials provided";
            break;
          default:
            message = error.message; 
        }  
      }
    }

    return (
      <div>
          <Typography variant='title'>
            SIGN IN
          </Typography>

          <LoginForm
            valid={valid}
            onChange={this.updateUserState}
            onSave={this.createUser}
            user={this.state.user} 
          />

          <Typography color="error">
            {message}
          </Typography>

          <Button 
            className={classes.submit}
            type="submit"
            fullWidth
            variant="raised"
            color="primary" 
            style={{float: 'right'}}
            onClick={this.createUser}>
            SIGN IN
          </Button>

          <Typography className={classes.register}>
            <a className={classes.pointer} onClick={e=>{e.preventDefault(); this.props.toggle()}}> 
              Register now!
            </a>
          </Typography>

          <Typography className={classes.resetpassword}>
            <a className={classes.pointer} onClick={e=>{e.preventDefault(); this.props.toggle()}}> 
              Forgot password?
            </a>
          </Typography>
      </div>
    );
  }
}

LoginPage.propTypes = {
  // error: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(Styles)(LoginPage);
