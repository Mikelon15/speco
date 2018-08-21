import React from 'react';
import PropTypes from "prop-types";
import RegistrationForm from './RegistrationForm';
import { Typography, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core';
import styles from '../styles';

class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        confirm: "",
      },
      valid: {
        username: "",
        email: "",
        password: "",
        confirm: ""
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
    let newState = Object.assign({}, this.state);
    let { username, email, password, confirm } = this.state.user; 
    let noErrors = true; 

    // display the correct helper text for password
    if(password !== confirm){
      noErrors = false; 
      newState.valid.password = "Passwords do not match";
      newState.valid.confirm = "Passwords do not match";
    } else if(password === "" && confirm === ""){
      noErrors = false; 
      newState.valid.password = "Please enter your password";
      newState.valid.confirm = "Please confirm your password";
    } else { 
      newState.valid.password = ""; 
      newState.valid.confirm = "";
    }
    // display the correct helper text for username
    if(username === ""){
      noErrors = false; 
      newState.valid.username = "Please enter a valid username";
    } else { newState.valid.username = "" }

    // helper message for blank email
    if(email === ""){
      noErrors = false;
      newState.valid.email = "Please enter a valid email";
    }

    // update the state, and if no errors, then register user
    this.setState(newState);
    if (noErrors)
      this.props.onSubmit(email, password, username);
  }

  render() {
    let { error, classes } = this.props; 

    // "auth/email-already-in-use"
    // "auth/invalid-email"
    let valid = Object.assign({}, this.state.valid);
    if(error) {
      switch(error.code){
        case("auth/invalid-email"): 
          valid.email = error.message;
          break;
        case("auth/email-already-in-use"): 
          valid.email = error.message;
          break;
        default:
      }  
    }
    
    return (
      <div>
        <Typography variant='title'>SIGN UP</Typography>
        <RegistrationForm
          onChange={this.updateUserState}
          onSave={this.createUser}
          saving={this.state.saving}
          user={this.state.user}
          valid={valid}
        />
        <Button 
          type="submit"
          fullWidth
          variant="raised"
          color="primary" 
          style={{float: 'right'}}
          onClick={this.createUser}>
          SIGN UP
        </Button>
        <Typography className={classes.register}>
          <a className={classes.pointer} onClick={e=>{e.preventDefault(); this.props.toggle()}}> 
            Already have an account? 
          </a>
        </Typography>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  // error: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(RegistrationPage);
